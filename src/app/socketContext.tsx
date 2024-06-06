import useAuth from "@/hooks/useAuth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useGetAllNotificationUnReadQuery } from "./redux/api/notiificationApi";
import { skipToken } from "@reduxjs/toolkit/query";


export interface Notification {
  id:string, 
  ownerId:string,
  senderId:string,
  link:string,
  priority:string,
  title:string,
  type:string,
  read:boolean,
  createdAt:string,
  updatedAt:string
}

interface SocketContextType {
  socket: Socket | null;
  UnReadNotifications: Notification[];
  unreadCount: number;
  setUnReadNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
}


const SocketContext = createContext<SocketContextType>({ socket: null,

  UnReadNotifications: [],
  unreadCount: 0,
  setUnReadNotifications: () => {},
  setUnreadCount: () => {},
 });




export const useSocket = () => {
  return useContext(SocketContext);
};


export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [UnReadNotifications, setUnReadNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const user=useAuth()



  


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

    return () => {
      newSocket.close();
    };
   }
  }, [user]);








  return (
    <SocketContext.Provider value={{ socket,UnReadNotifications,unreadCount,setUnReadNotifications,setUnreadCount }}>
      {children}
    </SocketContext.Provider>
  );
};
