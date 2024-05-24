


import { Loader2 } from "lucide-react";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { verifyToChangePassword } from "@/app/thunk/userThunk";

import { useNavigate, useSearchParams } from "react-router-dom";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useForgotPasswordSetNewPassMutation } from "@/app/api/AuthApi";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/
);

export interface UserData {

  password: string;
  confirmPassword: string;
 
}

const FormSchema = z.object({

  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .regex(passwordValidation, {
      message: "Your password is not valid ",
    }),
  confirmPassword: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .regex(passwordValidation, {
      message: "Your password is not valid ",
    }),
});

const ChangePassword = () => {
  const [searchParams] = useSearchParams();
  const tokenId:string = searchParams.get("tokenId") as string;

  const [isLoading, setLoading] = useState(false);  
  const [isConfirmPassMsg, setConfirmPassMsg] = useState("");


  const navigate = useNavigate();

const [forgotPasswordSetNewPass]=useForgotPasswordSetNewPassMutation()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {


    if(data.confirmPassword!==data.password){
      setConfirmPassMsg("password not matching")
    }
  

    if (!data || !tokenId) {
      toast({
        title:`all the fields are required`,
        variant: "destructive"
      })
      navigate('/login',{ replace: true })
    } 

      try {
        const response=await forgotPasswordSetNewPass({password:data.password,tokenId}).unwrap()

           if(response.isPasswordChanged){
            navigate('/login')
           }
      } catch (error:any) {
        if(!error.status){{}
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


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="enter new password"
                  className="text-black dark:text-primary"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[11px]">
                ** should contain atleast one uppercase,one lower-case,one
                number,one special character
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="enter confirm password"
                  className="text-black dark:text-primary"
                  {...field}
                />
              </FormControl>

              <FormMessage> {isConfirmPassMsg}</FormMessage>
            </FormItem>
          )}
        />

        {isLoading ? (
          <>
            <Button disabled className="w-full ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait ...
            </Button>
          </>
        ) : (
          <Button className="w-full" type="submit">
           change password
          </Button>
        )}
      </form>
    </Form>
  );
};
export default ChangePassword;
