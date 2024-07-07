
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { WorkSpaceNav } from "../../components/work-space/index"
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, MessageCircle, X } from "lucide-react";
import { LottieAnimation } from "@/components/lootie/Lootie";
import helloAnimation from '../../../public/json/helloman.json'
import { useState } from "react";

const SpaceLayout = () => {
  const { id,folderId } = useParams();
const navigate=useNavigate()
const [isClose,setClose]=useState<boolean>(false)

   
  if(!id){
    return 
  }
    
  const goBack = () => {
    navigate(-1); 
  };
  return (
    <>
    {
      folderId?(
        <>
        <Button className="bg-transparent hover:bg-transparent border-none text-slate-600" onClick={goBack}> <ArrowBigLeft/></Button>
        </>
      ):(<WorkSpaceNav id={id} />)
    }

   <div className="">
  {
    isClose&&(
      <div className="px-3.5 py-2 bg-gray-100 rounded    gap-3 inline-flex fixed right-[205px] bottom-[300px] z-50">
      <h5 className="text-gray-900 text-sm font-normal leading-snug h-4"> welcome to chat </h5>
    </div>
    )
  }
   <div className=" fixed right-0 bottom-0 z-50">

     <div className="flex ">
    
{isClose&&<LottieAnimation animationData={helloAnimation} height={400} width={160}/>}
     <Button className={isClose?'bg-transparent text-slate-600 border-0 hover:bg-transparent':'bg-blue-800 text-white mr-4 mb-4 hover:bg-transparent'} onClick={()=>setClose(!isClose)}>{isClose?<X/>:<MessageCircle />}</Button>
     </div>
   </div>
      
      <Outlet/>
   </div>
    </>
    
  )
}
export default SpaceLayout