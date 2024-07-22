import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell} from "lucide-react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Separator } from "../ui/separator";
import { useSocket } from "@/app/socketContext";
import {  useGetAllNotificationUnReadQuery } from "@/app/redux/api/notiificationApi";
import { useEffect } from "react";
import { AllNotificationMap, NotificationDetailsPage, NotificationItem } from "./index";
import {
  Card,
  CardContent,
} from "../ui/card";


const Notification = () => {
  const { UnReadNotifications, setUnReadNotifications } = useSocket();
  console.log(UnReadNotifications, "use context from");
  const { data: getUreadNotification } =
    useGetAllNotificationUnReadQuery(undefined, {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });





  useEffect(() => {
    if (getUreadNotification) {
      setUnReadNotifications(getUreadNotification);
    }
  }, [getUreadNotification]);

   





  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[580px] rounded-md ml-4  border dark:border-border "
    >
      <ResizablePanel defaultSize={60} minSize={35} maxSize={75}>
        <div className="  ">
          <div className=" min-h-[580px] items-end justify-end px-4">
            <Tabs defaultValue="all">
              <div className="flex justify-between">
                <div className="flex items-center py-6 px-4">
                  <h1 className="text-xl font-sfpro ">Notification</h1>
                  <Bell className="ml-4 text-xl text-gray-700 hover:animate-bounce" />
                </div>
                <div className="flex items-center py-6 px-4">
                  <TabsList className="  ">
                    <TabsTrigger value="unread" className="text-sm">
                      Uread
                    </TabsTrigger>
                    <TabsTrigger value="all" className="text-sm">
                      All Mail
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              <Separator className="w-full" />
              <TabsContent value="unread">
                <ScrollArea className="h-[580px]   w-full rounded-md border-none p-2">
                  <div className="px-4 py-6">
                    <Input
                      type="search"
                      placeholder="search all unread notification..."
                    />
                  </div>

                  <Card
                    x-chunk="dashboard-01-chunk-5 "
                    className="dark:border dark:border-none"
                  >
                    <CardContent className="grid gap-8">
                      <>
                        {UnReadNotifications &&
                          UnReadNotifications.length > 0 &&
                          UnReadNotifications.map((notification: any) => {
                            return (
                              <>
                            {
                      (
                                 !notification.read&&<NotificationItem
                                  notification={notification}
                                  key={notification.id}
                                />
                                )
                            }
                              </>
                            );
                          })}
                      </>
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="all">


                <ScrollArea className="h-[580px]   w-full rounded-md border-none p-2">
                <div className="px-4 py-6">
                    <Input
                      type="search"
                      placeholder="search all read notification..."
                    />
                  </div>
                       <AllNotificationMap/>
                </ScrollArea>
            
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <NotificationDetailsPage />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default Notification;
