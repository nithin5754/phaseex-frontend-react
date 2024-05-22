import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/app/api/AuthApi";
import { useAppDispatch } from "@/app/api/store";
import { selectCurrentToken, setCredentials, setUserName } from "@/features/auth/authSlice";
import { toast } from "../ui/use-toast";
import { useSelector } from "react-redux";

const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%*?&])[A-Za-z\d@$%*?&]{8,}$/
);

const FormSchema = z.object({
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
});

const AuthLogin = () => {
  const [isLoading, setLoading] = useState(false);
const token=useSelector(selectCurrentToken)
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/homepage";


  useEffect(()=>{
if(token){
  navigate(from, { replace: true });
}
  },[navigate, token, location, from])

  const [login] = useLoginMutation();

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.email && data.password) {
      try {
        setLoading(true);
        const userData = await login({
          email: data.email,
          password: data.password,
        }).unwrap();
        if (userData.accessToken) {
          dispatch(setCredentials(userData.accessToken));
          dispatch(setUserName(userData.data.userName))
          navigate(from, { replace: true });
          setLoading(false);
        }
      } catch (error: any) {
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
      } finally {
        setLoading(false);
      }
    } else {
      toast({
        title: "all fields are required",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <h1 className="font-sfpro text-center text-3xl">Login Form</h1>
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
              <h1 className="text-end text-sm">
                {" "}
                <Link to={"/verify-auth-forgot-password"}>forgot password</Link>
              </h1>
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

        {isLoading ? (
          <>
            <Button disabled className="w-full ">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          </>
        ) : (
          <Button className="w-full" type="submit">
            Sign-in
          </Button>
        )}
      <Link to={'/register'} >
         <h1 className="font-sfpro text-center mt-4">create  account</h1>
      </Link>
      </form>
    </Form>
  );
};
export default AuthLogin;
