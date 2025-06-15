import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi"
import { CActivitySendType } from "@/types/TActivity"
import { useEffect, useState } from "react"



const useActivityHook = (activityData:CActivitySendType) => {
  const [onCreateActivity]=useOnCreateActivityMutation() 
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    useEffect(()=>{
       fetch()
    },[activityData,onCreateActivity])

  const fetch=async()=>{
    let response=await onCreateActivity(activityData).unwrap()



    if(!response){
    setIsSuccess(false)
    }{
      setIsSuccess(true)
    }
  }



  return isSuccess
}
export default useActivityHook
