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
import { useAppDispatch } from "@/app/store/store";
import { VerifyUserThunk, resendOTPThunk} from "@/app/thunk/userThunk";
import { toast } from "../ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import OTPTimer from "./timer/OTPTimer";



const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const AuthVerifyOtp = () => {

  const [searchParams] = useSearchParams();
  const tokenId:string = searchParams.get("tokenId") as string;
  const navigate=useNavigate()

if (!tokenId) {
  navigate('/login')
}

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {

  
    console.log(data, "otp-verify");
    console.log(tokenId, "tokenId-verify");

    if (!data && !tokenId) {
      toast({
        title:"must required all the fields",
        variant: "destructive",
      })
      return
    } else {
      const otp: string = data.pin 

    let verifyData = { tokenId , otp };

    let res= await dispatch(VerifyUserThunk(verifyData)).unwrap()
    console.log(res,"verify auth-otp");
    

    if (res?.response?.status>=400) {
      toast({
        title:`${res?.response?.status}`,
        variant: "destructive",
        description: (
     <>
        <h2>{res?.response?.data?.message}</h2>
     </>
        ),
      })
    
      
       return
  
    }else{
      navigate('/login')
    }
      
    }
  }

  async function handleResendSubmit() {
   let res=await dispatch(resendOTPThunk(tokenId)).unwrap();
   if (res?.response?.status>=400) {
    toast({
      variant: "destructive",
      description: (
        <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{res?.response?.status}r</AlertTitle>
        <AlertDescription>
        {res?.response?.data?.message}
        </AlertDescription>
      </Alert>
           ),
    })
   return

  }else{
    console.log(res);
    
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
