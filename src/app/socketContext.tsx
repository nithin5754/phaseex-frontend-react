import useAuth from "@/hooks/useAuth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useGetAllNotificationUnReadQuery } from "./redux/api/notiificationApi";
import { skipToken } from "@reduxjs/toolkit/query";
import useGreetings from "@/hooks/useGreetings";
import { ReceiveNotificationVideoType } from "@/features/types/NotificationType";


export interface Notification {
  id:string, 
  ownerId:string,
  senderId:string,
  link:string,
  priority:string,
  title:string,
  messageSendBy:string,
  type:string,
  read:boolean,
  createdAt:string,
  updatedAt:string
}

interface SocketContextType {
  socket: Socket | null;
  UnReadNotifications: Notification[];
  GetVideoNotification:ReceiveNotificationVideoType|null;
  unreadCount: number;
  inviteCount:{workspaceId:string,count:number};
  setUnReadNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setVideoNotification: React.Dispatch<React.SetStateAction<ReceiveNotificationVideoType|null>>;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  setinviteCount: React.Dispatch<React.SetStateAction<{workspaceId:string,count:number}>>;
}


const SocketContext = createContext<SocketContextType>({ socket: null,

  UnReadNotifications: [],
  unreadCount: 0,
  inviteCount:{workspaceId:'',count:0},
  GetVideoNotification:null,
  setUnReadNotifications: () => {},
  setVideoNotification: () => {},
  setinviteCount: () => {},
  setUnreadCount: () => {},
 });




export const useSocket = () => {
  return useContext(SocketContext);
};


export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [UnReadNotifications, setUnReadNotifications] = useState<Notification[]>([]);
  const [GetVideoNotification,setVideoNotification]=useState<ReceiveNotificationVideoType|null>(null)
  const [unreadCount, setUnreadCount] = useState(0);

  const [inviteCount,setinviteCount]=useState<{workspaceId:string,count:number}>({workspaceId:'',count:0})
  const user=useAuth()


  const greet=useGreetings()

  


  useEffect(() => {
   if(user){
    const newSocket = io("http://localhost:4500");
    setSocket(newSocket);

    console.log(newSocket,"context api");
    

    newSocket.emit('newUser', user.userId);



    newSocket.on('getNotification', (notification: Notification) => {
      setUnReadNotifications((prev) => [notification,...prev]);
      setUnreadCount((prev) => prev + 1);
    });





    newSocket.on('getInviteVideoCall', (notification: ReceiveNotificationVideoType) => {
      if(notification){
        setVideoNotification(notification)
        console.log(notification,"GET INIVTATION");

      }
      
    });


    
    newSocket.on('getInviteVideoCallIndicator', (count:{workspaceId:string,count:number}) => {
      if(count){
        setinviteCount({workspaceId:count.workspaceId,count:count.count})
        console.log(count,"GET INIVTATION count");

      }
      
    });


    
    return () => {
      newSocket.close();
    };
   }
  }, [user]);








  return (
    <SocketContext.Provider value={{ socket,UnReadNotifications,unreadCount,setUnReadNotifications,setUnreadCount,setVideoNotification,GetVideoNotification,inviteCount,setinviteCount}}>
      {children}
    </SocketContext.Provider>
  );
};
