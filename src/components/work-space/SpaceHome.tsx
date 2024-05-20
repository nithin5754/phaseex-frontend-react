import { LottieAnimation } from "../lootie/Lootie";

import emptyLootieWorkSpace from "../../../public/json/empty-space-1.json";
import { ResponseWorkspaceDataType } from "@/app/api/spaceApi";
import {  EyeIcon, GlobeIcon, LockIcon } from "lucide-react";
import { OnGoingSideBar } from "./index";
import { Button } from "../ui/button";




// 
interface Props {
  allSpaces: ResponseWorkspaceDataType[] | [];
  getOnGoingSpace: ResponseWorkspaceDataType[] | [];
  handleHideSubmit: (id: string) => Promise<any>; 
  setCurrentPage: (page: number) => void;
  currentPage:number;
  totalPages:number


}

const SpaceHome = ({ allSpaces,getOnGoingSpace,handleHideSubmit,currentPage,setCurrentPage,totalPages}: Props) => {

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 p-4 lg:order-1 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-sfpro ">All Galaxy</h1>
          <button className="bg-slate-600 text-white text-sm px-2 py-1 rounded-lg">
            + New Galaxy
          </button>
        </div>
      
  {
    allSpaces.length > 0&& !allSpaces.every(space=>space.active)? (
      <div className="flex flex-wrap gap-2 m-auto justify-around items-center py-4 min-h-[350px] bg-white border border-gray-200 rounded-lg ">

        {allSpaces.map((space) => {
          if (space.active) { 
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


          const truncateTitle = (title:string) => {
            return title.length > 10 ? title.substring(0, 8) + '...' : title;
          };

          const truncateDesc = (desc:string) => {
            return desc.length > 10 ? desc.substring(0, 12) + '...' : desc;
          };

          return (
          <>
          
 

<div key={space.id} className="w-[300px] bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div
              className={`w-10 h-10 ${color} rounded-sm flex items-center justify-center text-white mr-4 text-xl font-semibold`}
              aria-label={`${space.title.charAt(0).toUpperCase()}`}
            >
              {space.title.charAt(0)}
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-lg font-bold text-gray-900">{truncateTitle(space.title)}</h2>
                {space.workspaceType === 'private' ? (
                  <LockIcon className="w-5 h-5 text-gray-500 ml-2" />
                ) : (
                  <GlobeIcon className="w-5 h-5 text-gray-500 ml-2" />
                )}
              </div>
              <p className="text-gray-600">{truncateDesc(space.workspace_description)}</p>
            </div>
          </div>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={() => handleHideSubmit(space.id)}
          >
            <EyeIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="px-6 py-4 border-t lex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-6 h-6 ${color} rounded-full flex items-center justify-center text-white mr-2 text-sm font-semibold`}
            aria-label={`${space.title.charAt(0).toUpperCase()}`}
          >
            {space.title.charAt(0)}
          </div>
  
        </div>
        <span className="text-gray-500 text-sm">{space.workspaceType} · 1 member</span>
      </div>
    </div>
  
          </>
          
          );
        })}
  
      </div>
    
    ) : (
      <div className="flex items-center justify-center bg-white border border-gray-200 rounded-lg h-[500px]">
      <div className="text-center">
        <LottieAnimation
          animationData={emptyLootieWorkSpace}
          height={200}
          width={200}
        />
        <p className="mt-4 text-gray-600">
          All Galaxy created, joined, hidden
        </p>
      </div>
      </div>
    )
  }

<div className="flex items-center justify-center">
  {allSpaces.length > 0 && !allSpaces.every((space) => space.active) && (
    <div className="pagination flex items-center space-x-2">
         <Button className="p-1 text-sm w-12 bg-slate-500 text-[12px] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </Button>
      <span className="text-sm">{currentPage}</span>
      <Button className="p-1 text-sm w-12 bg-slate-500 text-[12px] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </Button>
   
    </div>
  )}
</div>


      </div>

  <OnGoingSideBar getOnGoingSpace={getOnGoingSpace?getOnGoingSpace:[]} handleHideSubmit={handleHideSubmit }/>
    </div>
  );
};
export default SpaceHome;
