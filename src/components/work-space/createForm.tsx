
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
import { SpaceDataType, useCreateSpaceMutation } from "@/app/api/spaceApi"
import { toast } from "../ui/use-toast"


const FormSchema = z.object({
  workspace_name: z.string().min(2, {
    message: "workspace name must be at least 4 characters.",
  }),
  workspace_description: z.string().min(2, {
    message: "description must be at least 4 characters.",
  }),
})

export function WorkspaceForm() {
  const [position, setPosition] = React.useState("shared")
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
      workspaceOwner:"663f1aba456968ab3b2275d6",
      workspace_description:data.workspace_description,
       title:data.workspace_name,
       workspaceType:position
     }

     if(spaceData){
      try {
         const response=await createSpace(spaceData).unwrap()
         console.log(response);
         
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5 m-auto  ">
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
        <Button variant="outline">{position}  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> </Button>
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
<Button className="bg-transparent  hover:bg-slate-800 text-black border-black border hover:text-white font-bold py-1 px-2 rounded w-1/2 " type="submit">
 create
</Button>

</div>
      </form>
    </Form>
  )
}
