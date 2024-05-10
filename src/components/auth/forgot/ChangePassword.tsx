


import { Loader2 } from "lucide-react";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {useAppDispatch } from "@/app/store/store";
import { registerUser, verifyToChangePassword } from "@/app/thunk/userThunk";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const dispatch=useAppDispatch();

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
  

    if (!data && !tokenId) {
      throw new Error("tokenId / otp empty");
    } else {
      let verifyData = { password:data?.password,tokenId};
      dispatch(verifyToChangePassword(verifyData)).then((res)=>{
        if (res.meta.requestStatus === "rejected") {
          // toast.error(errorMessage);
          const url: string = `/`;
          navigate(url);
          throw new Error("error in changing password");
        } else {
          const url: string = `/login`;
          navigate(url);
        }
      })

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
                  className="text-black"
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
                  className="text-black"
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
