import {  useNavigate, useSearchParams } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";


import OTPTimer from "./timer/OTPTimer";
import { useVerifyUserMutation } from "@/app/redux/api/UserApi";
import { toast } from "../ui/use-toast";



const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const AuthVerifyOtp = () => {

  const [searchParams] = useSearchParams();
  const tokenId:string = searchParams.get("tokenId") as string;
  const navigate=useNavigate()

  const[verifyUser]=useVerifyUserMutation()

if (!tokenId) {
  navigate('/login')
}



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {

    if(!data.pin){
      toast({
        title:"required all the fields",
        variant: "destructive",
      })
    
    }else{
     try {
      const response=await verifyUser({tokenId,otp:data.pin}).unwrap()
        if(response.verified===true){
          navigate('/login', { replace: true })
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <OTPTimer  tokenId={tokenId}  />
        
      </form>
    </Form>
  );
};
export default AuthVerifyOtp;
