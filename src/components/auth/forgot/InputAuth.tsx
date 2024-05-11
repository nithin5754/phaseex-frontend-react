
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { string, z } from "zod"

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
import { useAppDispatch } from "@/app/store/store"
import { forgotPasswordVerifyThunk } from "@/app/thunk/userThunk"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email required.",
  }),
})

const InputAuth = () => {
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {

   let email:string=data.email as string
   let result= await dispatch(forgotPasswordVerifyThunk(email)).unwrap()
   console.log(result,"verify auth after success");

   if(result?.response?.status>=400){
    toast({
      title:`${result?.response?.status}`,
      variant: "destructive",
      description: (
   <>
      <h2>{result?.response?.data?.message}</h2>
   </>
      ),
    })
    
     navigate('/login')
   }else{
    const url: string = `/verify-auth-forgot-otp/?tokenId=${result?.isSend?.verify_token}`;
    navigate(url);
   }
   
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>enter email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">verify</Button>
      </form>
    </Form>
  )
}
export default InputAuth