import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import {useAppDispatch } from "@/app/store/store";
import { registerUser } from "@/app/thunk/userThunk";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { resetOrUpdateAuthId, resetOrUpdateTimer } from "@/app/slices/userSlice";
import { toast } from "../ui/use-toast";
import axios from "axios";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/
);

export interface UserData {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}

const FormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(8, { message: "First name cannot exceed 8 characters." })
    .regex(/^[a-zA-Z]*$/, {
      message: "Name can only contain letters.",
    }),

  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),

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

const AuthRegister = () => {
  const [isLoading, setLoading] = useState(false);  
  const [isConfirmPassMsg, setConfirmPassMsg] = useState("");



  const navigate = useNavigate();

  const dispatch=useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    
    const userData: UserData = {
      userName: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
      email: data.email,
    };
        
    if(data.password!==data.confirmPassword){
      toast({
        title:"password",
        variant: "destructive",
        description: (
     <>
        <h2>password not match please check again</h2>
     </>
        ),
      })
      navigate('/register')
     return
    }

    setLoading(true)
       
      try {
        let res=await dispatch(registerUser(userData)).unwrap()

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
  
    
     navigate('/register')

  } else {
    const url: string = `/verify-otp?tokenId=${res.verify_token}`;
    dispatch(resetOrUpdateTimer(res.updatedAt))
    dispatch(resetOrUpdateAuthId(res.verify_token))
    navigate(url);
  }
      } catch (error) {   
        console.log(error);
        if (axios.isAxiosError(error) && error.response?.data) {
          toast({
            title:`${error?.response?.status}`,
            variant: "destructive",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <h2>{error.response.data.error}</h2>
            </pre>
            ),
          })
        } else {
      


          toast({
            title:`${error}`,
            variant: "destructive" })
        }
        navigate('/register');

      } finally {
        setLoading(false)
       }
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-black"
                  placeholder="eg: nithin joji"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="example@gmail.com"
                  className="text-black"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
              Please wait
            </Button>
          </>
        ) : (
          <Button className="w-full" type="submit">
            sign -up
          </Button>
        )}
      </form>
    </Form>
  );
};
export default AuthRegister;
