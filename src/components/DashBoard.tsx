
import useAuth from "@/hooks/useAuth";
import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Socket, io } from "socket.io-client";
import { SearchUser } from "./search";
import { useSelector } from "react-redux";
import { getNotification } from "@/app/redux/slice/notificationSlice";








const DashBoard = () => {










  return (



    <div className="p-8">
     <Link to={'/hello'}>hello</Link>
     <Link to={'/login'}>login</Link>

        
    <Link to={'/'}>workspace</Link>
  <div>
  </div>
      
    </div>



      )



}
export default DashBoard