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
import { useState } from "react";
import { useAppDispatch } from "@/app/store/store";
import { loginUserThunk } from "@/app/thunk/userThunk";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "@/app/slices/authSlice";
import { UserInfo } from "@/features/types";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const { loading } = useSelector((state: any) => state.users);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    if (data) {
      try {
        let res = await dispatch(loginUserThunk(data)).unwrap();

        if (res?.response?.status >= 400) {
          toast({
            title: `${res?.response?.status}`,
            variant: "destructive",
            description: (
              <>
                <h2>{res?.response?.data?.message}</h2>
              </>
            ),
          });

          navigate("/login");
        } else {
          let userData: UserInfo = {
            userName: res?.data?.userName,
            accessToken: res?.accessToken,
            verified: res?.data?.verified,
          };

          if (userData.accessToken && userData.verified === true) {
            dispatch(setCredentials(userData));
            navigate(from, { replace: true });
          } else {
            toast({
              title: "network error please try again later",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error) && error.response?.data) {
          toast({
            title: `${error?.response?.status}`,
            variant: "destructive",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <h2>{error.response.data.error}</h2>
              </pre>
            ),
          });
        } else {
          console.log("An unexpected error occurred:", error);
        }
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
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
      </form>
    </Form>
  );
};
export default AuthLogin;
