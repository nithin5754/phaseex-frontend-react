import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";





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
  const [isLoading,setLoading]=useState(false)



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
   
    },
  });


  async function onSubmit(data: z.infer<typeof FormSchema>) {
     console.log(data,"login data");
     
}

  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className=" space-y-6"
    >

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

   

   {
    isLoading?(
      <>
      <Button  disabled className="w-full ">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait
      </Button>
      </>
    ):(
      <Button className="w-full" type="submit">
     Sign-in
      </Button>
    )
   }


    </form>
  </Form>
  )
}
export default AuthLogin