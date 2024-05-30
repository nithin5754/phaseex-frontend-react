
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"

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

import { useNavigate } from "react-router-dom"

import { useForgotPasswordVerifyMutation } from "@/app/redux/api/AuthApi"
import { toast } from "@/components/ui/use-toast"


const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email required.",
  }),
})

const InputAuth = () => {
  const [forgotPasswordVerify]=useForgotPasswordVerifyMutation()

  const navigate=useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {

    if(!data.email){

    }else{
      try {
      const response=await forgotPasswordVerify({email:data.email}).unwrap()
      console.log(response,"forgotpasword");
      
       if(response&&response.verify_token&&response.email){
        const url: string = `/verify-auth-forgot-otp/?tokenId=${response.verify_token}`;
        navigate(url,{ replace: true });
       }    
      } catch (error:any) {
        if(!error.status){
          toast({
            title: "something went wrong please try later",
            variant: "destructive",
          });
        }else if(error.status){         
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
      <h1 className="font-sfpro text-center text-xl">forgot password</h1>
    

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>enter already registered email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
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