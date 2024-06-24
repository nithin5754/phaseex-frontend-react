import { LottieAnimation } from "../lootie/Lootie";

import emptyLootieWorkSpace from "../../../public/json/empty-space-1.json";
import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";
import { OnGoingSideBar } from "./index";
import { Button } from "../ui/button";
import { WorkSpaceFolderList } from "../../components/folder/index";
import ReactPaginate from 'react-paginate';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface Props {
  allSpaces: ResponseWorkspaceDataType[] | [];
  getOnGoingSpace: ResponseWorkspaceDataType[] | [];
  handleHideSubmit: (id: string) => Promise<any>;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const SpaceHome = ({
  allSpaces,
  getOnGoingSpace,
  handleHideSubmit,
  currentPage,
  setCurrentPage,
  totalPages,
}: Props) => {



  return (



<div className="min-h-screen p-6">
<div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-sfpro ">All Galaxy</h1>
          <button className="bg-slate-600 text-white text-sm px-2 py-1 rounded-lg">
            + New Galaxy
          </button>
        </div>


<ResizablePanelGroup
      direction="horizontal"
      className=" rounded-lg border-0  p-4  "
    >
      <ResizablePanel defaultSize={50} className="min-h-[580px] dark:border dark:border-border rounded-md mr-4">



      <ScrollArea className="h-[590px]  rounded-md   ">
      <div className="p-4   " >
        <h4 className="mb-4 text-sm font-sfpro leading-none sticky  top-0 z-50 dark:bg-background py-4">Hidden and Completed </h4>
      {allSpaces.length > 0 && !allSpaces.every((space) => space.active) ? (
      
          <>
          <WorkSpaceFolderList hiddenProjects={allSpaces} handleHideSubmit={handleHideSubmit } />
           </>
        ) : (
          <div className="flex h-[520px]  items-center justify-center my-auto bg-white  dark:bg-background dark:text-primary dark:border-border">
        <div className="flex flex-col justify-center items-center h-full">
        
              <LottieAnimation
                animationData={emptyLootieWorkSpace}
                height={200}
                width={200}
              />
              <p className="mt-4 text-gray-600">
                All Galaxy completed, joined, hidden
              </p>
            </div>
            
          </div>
        )}
      </div>
    </ScrollArea>
  


     
    

       


      </ResizablePanel>
 <ResizableHandle style={{ backgroundColor: 'transparent' }} />

      <ResizablePanel defaultSize={50} className="min-h-[580px] dark:border dark:border-border rounded-md">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full  ">
            {/* ongoing workspace */}
      <OnGoingSideBar
        getOnGoingSpace={getOnGoingSpace ? getOnGoingSpace : []}
        handleHideSubmit={handleHideSubmit}
      />
            </div>
          </ResizablePanel>



        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
</div>

  );
};
export default SpaceHome;
