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
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



import { Link, useLocation, useNavigate } from "react-router-dom";


import { toast } from "../ui/use-toast";
import { useRegisterMutation } from "@/app/redux/api/UserApi";
import { resetOrUpdateAuthId, resetOrUpdateTimer } from "@/app/redux/slice/userSlice";
import { useAppDispatch } from "@/app/redux/api/store";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/features/auth/authSlice";

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

  const token=useSelector(selectCurrentToken)

  const navigate = useNavigate();
  const dispatch=useAppDispatch()

  const[register]=useRegisterMutation()

  const location = useLocation();
  const from = location.state?.from?.pathname || "/homepage";
  console.log(from ,"hell path");
  


  useEffect(()=>{
if(token){
  navigate(from, { replace: true });
}
  },[navigate, token, location, from])


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

    if (data.password !== data.confirmPassword) {
      toast({
        title: "password",
        variant: "destructive",
        description: (
          <>
            <h2>password not match please check again</h2>
          </>
        ),
      });
      navigate("/register");
      
    }else{
      try {
        setLoading(true)
        let response=await register(userData).unwrap()
        console.log(response,"register");
        
        if(response.verify_token && response.updatedAt){
          const url: string = `/verify-otp?tokenId=${response.verify_token}`;
          dispatch(resetOrUpdateTimer(response.updatedAt));
          dispatch(resetOrUpdateAuthId(response.verify_token));
          navigate(url);
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
      }finally{
        setLoading(false)
      }
    }

   


  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
      <h1 className="font-sfpro text-center text-3xl">Register Form</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-white dark:text-primary"
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
                  className="text-white dark:text-primary"
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
                  className="text-white dark:text-primary"
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
                  className="text-white dark:text-primary"
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
           <Link to={'/login'} >
         <h1 className="font-sfpro text-center mt-4">Already have an account</h1>
      </Link>
      </form>
    </Form>
  );
};
export default AuthRegister;
