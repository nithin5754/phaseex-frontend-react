import { setNotificationDetails } from "@/app/redux/slice/notificationSlice";
import { NotificationDetailsType } from "@/features/types/NotificationType";
import { Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { FirstTwoCharacter } from "@/lib/FirstTwoCharacter";
import { useOnDeleteSingleNotificationMutation } from "@/app/redux/api/notiificationApi";

interface Props {
  notification: NotificationDetailsType;
}

const   NotificationItem = ({ notification }: Props) => {
  const dispatch = useDispatch();

  const [onDeleteSingleNotification] = useOnDeleteSingleNotificationMutation();

  const handleDeleteSingleNotification = async (notificationId: string) => {
    try {
      if (notificationId) {
        await onDeleteSingleNotification(notificationId).unwrap();
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar
          className="hidden h-9 w-9 sm:flex"
          onClick={() => dispatch(setNotificationDetails(notification))}
        >
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>
            {FirstTwoCharacter(notification.messageSendBy)}
          </AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <p className="text-sm font-medium leading-none">
            {notification.messageSendBy}
            <span className="ml-8 border border-border rounded-full px-1 text-[10px]  font-sfpro hover:bg-slate-700 hover:text-primary">
              {notification.type}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">{notification.title}</p>
        </div>
        <div className="ml-auto font-medium">
          {" "}
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => handleDeleteSingleNotification(notification.id)}
          >
            <Trash size={17} />
          </button>
        </div>
      </div>
    </>
  );
};
export default NotificationItem;
