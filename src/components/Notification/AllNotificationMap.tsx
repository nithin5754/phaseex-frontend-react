import { useGetAllNotificationQuery } from "@/app/redux/api/notiificationApi";
import { Card, CardContent } from "../ui/card";
import { NotificationItem } from "./index";


 const AllNotificationMap = () => {

  const { data: getAllNotification } =
  useGetAllNotificationQuery(undefined, {
    pollingInterval: 120000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  

   return (
    <Card
    x-chunk="dashboard-01-chunk-5 "
    className="dark:border dark:border-none"
  >
    <CardContent className="grid gap-8">
      <>
        {getAllNotification &&
          getAllNotification.length > 0 &&
          getAllNotification.map((notification: any) => {
            return (
              <>
            {
      
                <NotificationItem
                  notification={notification}
                  key={notification.id}
                />
            }
              </>
            );
          })}
      </>
    </CardContent>
  </Card>
   )
 }
 export default AllNotificationMap