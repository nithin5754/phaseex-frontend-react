import {  useNavigate, useSearchParams } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useAppDispatch } from "@/app/store/store";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { verifyOtpFOrgotPasswordThunk } from "@/app/thunk/userThunk";
import { toast } from "@/components/ui/use-toast";




const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const ForgotOtp = () => {
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

    if (!data || !tokenId) {
      toast({
        title:`fields are required`,
        variant: "destructive"
      })
    } else {
      const otp: string = data.pin 

      let verifyData = { otp,tokenId};
    let res=await dispatch(verifyOtpFOrgotPasswordThunk(verifyData)).unwrap()

    if(res?.response?.status>=400){

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
     } else {
          const url: string = `/change-forgot-password?tokenId=${res.tokenId}`;
          navigate(url);
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
      </form>
    </Form>
  );
};
export default ForgotOtp;
