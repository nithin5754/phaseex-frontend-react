import { LottieAnimation } from "../lootie/Lootie"
import { AssignedSort } from "./index"
import emptyLootieWorkSpace from '../../../public/json/empty-space-1.json'
import { ResponseWorkspaceDataType } from "@/app/api/spaceApi"

interface Props {
    allSpaces:ResponseWorkspaceDataType[]|[]
}

const SpaceHome = ({allSpaces}:Props) => {
  return (
  //  <div className="container">
  //      <h1 className="font-sfpro  font-medium text-2xl underline">All Galaxy</h1>
  //      <div className="structure">
  //         <div className="flex ">
  //           <div className="space-add flex-1 bg-blue-600 h-full">
  //             <div className="galaxy-added-header">
  //             <h1>Galaxy added</h1>
  //             <AssignedSort/>
                
  //             </div>

  //           </div>
  //           <div className="space-create w-[350px] bg-yellow-400 ">Galaxy created</div>
               
  //         </div>
            
  //      </div>
  //  </div>

  <>
  
  <div className="min-h-screen flex flex-col lg:flex-row">
 
        <div className="flex-1 p-4 lg:order-1 ">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-sfpro ">All Galaxy</h1>
                <button className="bg-slate-600 text-white text-sm px-2 py-1 rounded-lg">+ New Galaxy</button>
            </div>
            <div className="flex items-center justify-center bg-white border border-gray-200 rounded-lg h-[500px]">
                <div className="text-center">
                    <LottieAnimation animationData={emptyLootieWorkSpace}/>
                    <p className="mt-4 text-gray-600">All Galaxy created,joined,hidden</p>
                </div>
            </div>
        </div>


        <aside className="w-full mt-16 mr-4 lg:w-[350px] bg-white border-r  border-b border-t border-gray-200 p-4 lg:order-2 rounded-lg  lg:border-l">
            {/* <h2 className="font-sfpro text-lg mb-4">OnGoing Galaxy</h2>
            <ul>
                <li className="mb-2 flex items-center">
                   <div className="flex my-auto">
                   <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white mr-2 text-[14px] font-sfpro">T</div>
                    <span>test</span>
                   </div>
                </li>
            
             
            </ul> */}
            {
                allSpaces.map((space)=>{
                    return(
                        <h1>{space.workspaceOwner}</h1>
                    )
                })
            }
        </aside>
    </div>
  
  </>
  )
}
export default SpaceHome