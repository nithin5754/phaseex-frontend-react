
import { useSelector } from 'react-redux'
import emptyLootie from '../../../public/json/empty-inbox-1.json'
import { LottieAnimation } from "../lootie/Lootie"
import { selectNotificationDetails } from '@/app/redux/slice/notificationSlice'
import { FirstTwoCharacter } from '@/lib/FirstTwoCharacter'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'


 const NotificationDetailsPage = () => {
  const notificationDetails=useSelector(selectNotificationDetails)
   return (
    <>
           {
            !notificationDetails?(<>
             <div className="flex flex-col h-full items-center justify-center p-6">
            <LottieAnimation animationData={emptyLootie} height={200} width={200}/>
            <span className="text-slate-500 font-sfpro">empty message</span>
            </div> 
            </>):(<>
              <div className="border dark:border-slate-500 h-full m-2 rounded-sm shadow-lg p-2 px-4 mb-4 dark:hover:bg-slate-600 dark:hover:bg-opacity-20 ">
     <div className="flex flex-row gap-2 items-center justify-center">
     <Avatar className="hidden h-9 w-9 sm:flex ">
                  <AvatarImage src="/avatars/01.png" alt="Avatar" />
                  <AvatarFallback>{FirstTwoCharacter(notificationDetails.messageSendBy)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-lg  font-sfpro leading-none">
                  {notificationDetails.messageSendBy.toUpperCase()}
                  </p>
               
                </div>
     </div>
              
                <Separator className='my-6 left-0 right-0'/>

                <p className="text-sm text-muted-foreground">
                  {notificationDetails.title}
                  </p>

                  <p className="text-sm text-muted-foreground mt-6">
                 <span>Type:</span> {notificationDetails.type}
                  </p>

                  <p className="text-sm text-muted-foreground">
                 <span>Space Name:</span> {notificationDetails.workspaceName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                 <span>Sender Name:</span> {notificationDetails.messageSendBy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                 <span>created at:</span> {notificationDetails.createdAt}
                  </p>

                  <p className="text-sm text-muted-foreground mt-7 ">
               {notificationDetails.Description}
                  </p>

<Link to=  {`${notificationDetails.link}${notificationDetails.id}&senderId=${notificationDetails.ownerId}`}>
<Button className="text-sm text-muted-foreground mt-7 ">
              accept
             </Button>
</Link>
          
       </div>
            </>)
           }
      
   
    
    </>
   )
 }
 export default NotificationDetailsPage