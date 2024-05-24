
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "../ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import React from "react"
import { ChevronsUpDown } from "lucide-react"
import { SpaceDataType, useCreateSpaceMutation } from "@/app/redux/api/spaceApi"
import { toast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"


const FormSchema = z.object({
  workspace_name: z.string().min(2, {
    message: "workspace name must be at least 4 characters.",
  }),
  workspace_description: z.string().min(2, {
    message: "description must be at least 4 characters.",
  }),
})

interface Props {
  handleClose: () => void;
}

export function WorkspaceForm({ handleClose }: Props) {
  const [position, setPosition] = React.useState("shared")
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      workspace_name: "",
      workspace_description:""
    },
  })

  const [createSpace]=useCreateSpaceMutation()


  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let spaceData:SpaceDataType={
      workspaceOwner:"",
      workspace_description:data.workspace_description,
       title:data.workspace_name,
       workspaceType:position
     }

     if(spaceData){
      try {
         const response=await createSpace(spaceData).unwrap()
         console.log(response);
        if(response.id&&response.workspaceOwner){
        navigate('/space')
        handleClose()
        }else{
          toast({
            title: "something went wrong",
            variant: "destructive",
          });

        }
      } catch (error:any) {
        if (!error.status) {
          toast({
            title: "no response",
            variant: "destructive",
          });
        } else if (error.status) {
          toast({
            title: `${error.data.message}`,
            variant: "destructive",
          });
      }
     }
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5 m-auto dark:text-primary ">
        <FormField
          control={form.control}
          name="workspace_name"
          render={({ field }) => ( 
            <FormItem>
              <FormLabel>Enter name of the space</FormLabel>
              <FormControl>
                <Input placeholder="galaxy" {...field}  className="w-full"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="workspace_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description about your space</FormLabel>
              <FormControl>
                <Textarea  placeholder="write a description in here....."{...field}  className="w-full"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

   <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="dark:bg-background dark:hover:bg-secondary dark:border-border dark:border dark:text-primary">{position}  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50 " /> </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Type of the work space</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="private">private</DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="shared">shared</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    
       



<div className="w-full flex justify-center">
<Button className="bg-transparent  hover:bg-slate-800 text-black border-slate-200 border hover:text-white dark:hover:bg-secondary hover:transition-colors font-bold py-1 px-2 rounded w-1/2 dark:border-border dark:text-primary  " type="submit">
 create
</Button>

</div>
      </form>
    </Form>
  )
}
