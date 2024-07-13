
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SideBarItemsType } from "../../features/types/sideBarItemsType";
import SideBarButton from "./SideBar-btb";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {LogOut, MoreHorizontal, Settings ,X as CloseButton, SidebarClose, SidebarOpen, SidebarOpenIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {useEffect, useState } from "react";
import {useSendLogOutMutation } from "@/app/redux/api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import { ModeToggle } from "../mode-toggle";
import { useAppDispatch } from "@/app/redux/api/store";
import { getNotification, notificationOpen } from "@/app/redux/slice/notificationSlice";
import { useSocket } from "@/app/socketContext";
import { selectSideCloseOpen, setSideBarClose, setSideBarOpen } from "@/app/redux/slice/uttilSlice";

import { googleLogout } from '@react-oauth/google';


interface SideBarDesktopProps {
  sidebarItems:SideBarItemsType
}

const SideBarDesktop = (props:SideBarDesktopProps) => {
 const [isClose,setClose]=useState<boolean>(false)
const navigate=useNavigate()
const userName=useSelector(selectCurrentUserName)




 const [sendLogOut,
  {

   isSuccess,

 }]=useSendLogOutMutation()




 useEffect(()=>{
 if(isSuccess){
  navigate('/login')
 }
 },[isSuccess,navigate])





  const location=useLocation()
  const pathname=location.pathname
   
  const sliceDispatch=useDispatch()

  const handleClose=()=>{
    // setClose(!isClose)

    sliceDispatch(setSideBarClose(undefined))
  
  }


  const handleLogOut=async()=>{
    await googleLogout()
    await sendLogOut().unwrap()
 
  
  }

  const dispatch=useAppDispatch()


  const handleNotificationOpen=()=>{
    dispatch(notificationOpen(true))
  }

 

  const selectDashOpenClose=useSelector(selectSideCloseOpen)


  const handleOpenSideBar=()=>{
dispatch(setSideBarOpen(undefined))
  }

  return (
   <aside  className={`${!selectDashOpenClose ? 'min-w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r block dark:bg-background dark:text-primary dark:border-border  ' : ' max-w-xs h-screen fixed left-0 top-0 z-40 border-r block dark:bg-background dark:text-primary dark:border-border   '}`}>
         <div className={`${!selectDashOpenClose?'h-full px-3 py-4':'h-full px-3 py-4'}`}>
          <div className="flex justify-between m-auto">
      {
        !selectDashOpenClose?(
          <>
              <h3 className='mx-3 text-lg font-semibold text-foreground'>Phaseex</h3>
              <CloseButton onClick={handleClose}/>
          </>
        ):(
          <>
          <SidebarOpenIcon size={23} className="mx-3" onClick={handleOpenSideBar}/>
          </>
        )
      }

            </div>  
         <div className='mt-5'>
         <div className='flex flex-col gap-1 w-full'>
              {
                props.sidebarItems.links.map((link,index)=>{
              
                  
                  return (
              <>
              {
                link.label==='inbox'?(


                  <>
                     <Link key={index} to={link.href}>
                  <SideBarButton 
                    variant={pathname===link.href?'secondary':'ghost'}
                    icon={link.icon}
                    className="w-full"
                  >
              {/* {`Inbox ${notificationList&&notificationList.length>0?notificationList.length:''}`} */}


                  </SideBarButton>
                  </Link>
                  </>
                ):(


              <>
              <Link key={index} to={link.href}>
              <SideBarButton
               variant={pathname===link.href?'secondary':'ghost'}
               icon={link.icon}
               className="w-full"
               >
                   {!selectDashOpenClose&&link.label}

              </SideBarButton>
          </Link>
              
              </>
                )
              }
              
              </>
                  )
                })
              }
               {props.sidebarItems.extras}
         </div>
         <div className='absolute left-0 bottom-3 w-full px-3'>
            <Separator className='absolute -top-3 left-0 w-full' />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant='ghost' className='w-full justify-start'>
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-2'>
                      <Avatar className='h-5 w-5'>
                        <AvatarImage src='https://github.com/max-programming.png' />
                        <AvatarFallback>{userName?userName:'nithin'}</AvatarFallback>
                      </Avatar>
                      <>
                      {
                           !selectDashOpenClose&&(<>
                           
                            <span>{userName?userName:'nithin'}</span>
                           </>)
                      }
                      </>
                    </div>
                   {
                    !selectDashOpenClose&& <MoreHorizontal size={20} />
                   }
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='mb-6 w-56 p-3 rounded-lg'>
                <div className='space-y-1'>
             
                    <SideBarButton size='sm' icon={Settings} className='w-full'>
                    <ModeToggle />
                    </SideBarButton>
              
                  <SideBarButton onClick={handleLogOut} size='sm' icon={LogOut} className='w-full'>
                    Log Out
                  </SideBarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
         </div>
         </div>

    </aside>
  )
}
export default SideBarDesktop