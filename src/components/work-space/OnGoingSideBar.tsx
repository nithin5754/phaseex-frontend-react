import { ResponseWorkspaceDataType } from "@/app/api/spaceApi";
import { EyeOff } from "lucide-react";
import EmptyBoxLottie from '../../../public/json/emptyBox.json'
import { LottieAnimation } from "../lootie/Lootie";
import { Link } from "react-router-dom";

interface Props {
  getOnGoingSpace: ResponseWorkspaceDataType[] | [];
  handleHideSubmit: (id: string) => Promise<any>; 
}




const OnGoingSideBar = ({getOnGoingSpace,handleHideSubmit}:Props) => {
  return (
    <aside className="w-full mt-16 mr-4 lg:w-[350px] bg-white border-r my-auto items-center border-b border-t border-gray-200 p-4 lg:order-2 rounded-lg  lg:border-l">
    <h2 className="font-sfpro text-lg mb-4">OnGoing Galaxy</h2>
  {
    getOnGoingSpace.length>0&&getOnGoingSpace.some(space=>space.active)?(
      <ul>
      {getOnGoingSpace.map((space) => {
          if (!space.active) {
           
            return null;
          }
        let color = "bg-orange-500";

        if (/^([a-c])/i.test(space.title[0].toLowerCase())) {
          color = "bg-blue-500";
        } else if (/^([d-g])/i.test(space.title[0].toLowerCase())) {
          color = "bg-green-500";
        } else if (/^([h-k])/i.test(space.title[0].toLowerCase())) {
          color = "bg-yellow-500";
        } else if (/^([l-o])/i.test(space.title[0].toLowerCase())) {
          color = "bg-red-500";
        } else if (/^([p-z])/i.test(space.title[0].toLowerCase())) {
          color = "bg-purple-500";
        }

        return (
          <li key={space.id} className="mb-2 flex justify-between hover:bg-slate-100 hover:rounded-md px-3">
            <div className="flex ">
              <div className="flex flex-row gap-2 my-auto">
                <div
                  className={`w-6 h-6 ${color} rounded-full flex items-center justify-center text-white mr-2 text-[14px] font-sfpro hover:bg-slate-600`}
                >
                  {space.title[0].toUpperCase()}
                </div>
              <Link to={`/space/${space.id}`}>
                <span>{space.title}</span>
              </Link>
              </div>
            </div>
            <button className="bg-transparent font-thin text-slate-400 w-1 border-0"  onClick={()=>handleHideSubmit(space.id)}>

            <EyeOff/>
            </button>
          </li>
        );
      })}
    </ul>
    ):(
      <div className="flex justify-center my-auto">
        <LottieAnimation animationData={EmptyBoxLottie} height={200} width={200}/>
      </div>
    )
  }
  </aside>
  )
}
export default OnGoingSideBar