import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import useAuth from "@/hooks/useAuth";
import { useSocket } from "@/app/socketContext";
import { useGetAllCollabInSpaceQuery } from "@/app/redux/api/spaceApi";

const FormSchema = z.object({
  roomId: z.string().min(6, {
    message: "Username must be at least 2 characters.",
  }),
});

export function CreateRoomId() {
  const { id } = useParams();
  const { socket } = useSocket();
  const navigate = useNavigate();

  const userId=useAuth()

  if(!id){
    navigate(-1)
    return
  }

  const currentName=useSelector(selectCurrentUserName)


  const {data:getAllCollab}=useGetAllCollabInSpaceQuery(id)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roomId: "",
    },
  });



  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data.roomId && id && typeof id === "string"&&socket) {
      const VNotificationSend={
        senderId:userId?.userId,
        ownerName:currentName,
        receiverArray:getAllCollab&&getAllCollab.length>0?getAllCollab:[],
        workspaceId:id,
        url:`${window.location.protocol}//${window.location.host}/space/${id}/room/${data.roomId}`,
        type:"video"
      
      }
     
     
       socket.emit("SendInviteVideoCall",VNotificationSend)
      navigate(`/space/${id}/room/${data.roomId}`, { replace: true });
    } else {
      toast({
        title: "Enter room id",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 space-y-6 flex mx-auto flex-col"
      >
        <FormField
          control={form.control}
          name="roomId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-primary font-sfpro text-xl  text-center flex mx-auto ">
                CREATE ROOM ID
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="eg:zvWz78chgx"
                  {...field}
                  className="dark:text-primary"
                />
              </FormControl>
              <FormDescription className="text-[.7rem]">
                **with this id other members in the space can join
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Go</Button>
      </form>
    </Form>
  );
}
