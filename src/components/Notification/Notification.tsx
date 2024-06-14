import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, Bell, Trash } from "lucide-react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useSocket } from "@/app/socketContext";
import { useGetAllNotificationUnReadQuery } from "@/app/redux/api/notiificationApi";
import { useEffect } from "react";
import { NotificationDetailsPage, NotificationItem } from "./index";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Notification = () => {
  // const notificationArray=useSelector(getNotification)
  const { UnReadNotifications, setUnReadNotifications } = useSocket();
  console.log(UnReadNotifications, "use context from");
  const { data: getUreadNotification, error } =
    useGetAllNotificationUnReadQuery(undefined, {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });
  console.log(error, "uread notification");
  useEffect(() => {
    if (getUreadNotification) {
      setUnReadNotifications(getUreadNotification);
    }
  }, [getUreadNotification]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[550px] rounded-md  border dark:border-slate-500 mb-4 "
    >
      <ResizablePanel defaultSize={60} minSize={35} maxSize={75}>
        <div className="  ">
          <div className=" min-h-[700px] items-end justify-end px-4">
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
                <ScrollArea className="h-[600px]   w-full rounded-md border-none p-2">
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
                                <NotificationItem
                                  notification={notification}
                                  key={notification.id}
                                />
                              </>
                            );
                          })}
                      </>
                    </CardContent>
                  </Card>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="all">
                <ScrollArea className="h-[550px]   w-full rounded-md border-none p-2">
                  <div className="px-4 py-6">
                    <Input
                      type="search"
                      placeholder="search all notification..."
                    />
                  </div>
                  <div className="border dark:border-slate-500 rounded-lg shadow-lg p-2 px-4 mb-4 dark:hover:bg-slate-600 dark:hover:bg-opacity-20 ">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-left">
                        <h2 className="text-sm font-semibold pb-1">
                          nithinjoji
                        </h2>
                        <p className="text-xs text-gray-500">invite</p>
                      </div>
                      <span className="text-sm text-gray-500">1 week ago</span>
                    </div>
                    <div className="text-gray-700 mb-4">
                      dgmasdjghksdhg dnsbgjksdhjfhs sdfsgdj
                    </div>
                    <div className="flex justify-end">
                      <button className="text-gray-500 hover:text-gray-700">
                        <Trash />
                      </button>
                    </div>
                  </div>
                </ScrollArea>
                <Button className="item-center flex mx-auto mb-2">
                  Mark all Read
                </Button>
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
