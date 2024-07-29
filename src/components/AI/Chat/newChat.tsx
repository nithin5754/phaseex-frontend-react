import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddNewGrpMutation } from "@/app/redux/api/gtpSlice";
import { toast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/app/redux/api/store";
import { addGroup } from "@/app/redux/slice/geminiSlice";
import { useNavigate } from "react-router-dom";

const FormSchema = z.object({
  gptName: z.string().min(2, {
    message: "GptName must be at least 2 characters.",
  }),
});

export function CreateNewGPTChat() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gptName: "",
    },
  });

  const [addNewGrp] = useAddNewGrpMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data && data.gptName) {
      let response = await addNewGrp({ group_title: data.gptName }).unwrap();

      if (response) {
        dispatch(
          addGroup({
            groupId: response.id,
            userId: response.userId,
            title: response.title,
          })
        );

        navigate(`/phaseex-ai/chat/${response.id}`);

        toast({
          title: "new chat created",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6 ">
        <FormField
          control={form.control}
          name="gptName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-thin">Chat name</FormLabel>
              <FormControl>
                <Input placeholder="enter new name for chat " {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
