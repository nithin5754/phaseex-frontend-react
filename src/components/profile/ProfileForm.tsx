

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useSelector } from "react-redux"
import { selectCurrentEmail, selectCurrentUserName } from "@/features/auth/authSlice"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
})

export function ProfileForm() {

  const userName=useSelector(selectCurrentUserName)
  const email=useSelector(selectCurrentEmail)


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username:userName?userName:'',
      email:email?email:''
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 ">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-primary">Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field}  className="text-black dark:text-primary"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-primary">email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field}  className="text-black dark:text-primary"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
      </form>
    </Form>
  )
}
