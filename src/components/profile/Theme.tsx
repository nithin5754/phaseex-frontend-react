
import { colors } from "@/lib/colors"
import { useEffect, useState } from "react"

import { CircleOff } from 'lucide-react';
import { useAppDispatch } from "@/app/redux/api/store";
import { setColor } from "@/app/redux/slice/uttilSlice";

   const Theme = () => {
    const [isColors,setColors]=useState<string[]|[]>([])
const dispatch=useAppDispatch()

    useEffect(()=>{
  setColors(colors)
    
    },[])

     return(

     <div className="flex flex-col gap-2">
      <h1 className="dark:text-primary">Colors</h1>
      <div className="flex flex-center gap-4">
      {    isColors.map((color:string,index:number)=>{
         return(
           <>
           <button
           onClick={()=>dispatch(setColor(index))
           }
          
className={`uppercase h-12 w-12  border-[1px] flex items-center justify-center rounded-full ${color}`}
>
{index===4&&<CircleOff className="h-full w-full"/>}
</button>
           </>
         )
       })}
    </div>
     </div>
     )
    
     
   }
   export default Theme