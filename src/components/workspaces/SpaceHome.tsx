import { LottieAnimation } from "../lootie/Lootie";

import emptyLootieWorkSpace from "../../../public/json/empty-space-1.json";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";

import { FC, ReactElement, useContext } from "react";

import { OpenModal } from "../modal/box-modal-settings";
import { Plus } from "lucide-react";
import { WorkSpaceHiddenLists } from "./workspaceFoldersList";
import OnGoingOwnerSpaceLists from "./OnGoingSideBar";
import InvitedSpaceLists from "./InvitesSpacesLists";
import { WorkSpaceContext } from "../../features/spaces/providers/space.providers";



const SpaceHome: FC = (): ReactElement => {
  const { getAllHiddenSpaces: allSpaces } = useContext(WorkSpaceContext);

  return (
    <div className=" ">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-sfpro font-bold capitalize">All Galaxy</h1>
        <div className=" ">
          <OpenModal title={"create"} icon={Plus} />
        </div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border-0  p-4  h-[450px]"
      >
  
        <ResizablePanel
          defaultSize={30}
          minSize={30}
          maxSize={75}
          className="h-[450px] border border-border rounded-md mr-4"
        >
          <ScrollArea className="h-[450px]  rounded-md   ">
            <div className="p-4   ">
              <h4 className="mb-4 text-xl text-center  font-sfpro leading-none sticky  top-0  dark:bg-background py-4 capitalize">
                Hidden spaces{" "}
              </h4>
              {allSpaces.length > 0 &&
              !allSpaces.every((space) => space.active) ? (
                <>
                  <WorkSpaceHiddenLists />
                </>
              ) : (
                <div className="flex h-[300px]  items-center justify-center my-auto bg-white  dark:bg-background dark:text-primary dark:border-border">
                  <div className="flex flex-col justify-center items-center h-full">
                    <LottieAnimation
                      animationData={emptyLootieWorkSpace}
                      height={200}
                      width={200}
                    />
                    <p className="mt-4 text-gray-600">
                      All hidden spaces you created
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </ResizablePanel>
        {/* 2 box */}

        <ResizableHandle style={{ backgroundColor: "transparent" }} />

        <ResizablePanel
             className="h-[450px] border border-border rounded-md mr-4"
          defaultSize={30}
          minSize={30}
          maxSize={50}
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <ScrollArea className="h-[450px]  rounded-md   ">
                <div className="flex flex-col items-center h-full  ">
                  <h4 className="mb-4 text-xl font-sfpro text-center mt-4 mx-auto   dark:bg-background py-4 capitalize">
                    Own Spaces{" "}
                  </h4>

                  <OnGoingOwnerSpaceLists />
                </div>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        {/* 3 box */}
        <ResizableHandle style={{ backgroundColor: "transparent" }} />

        <ResizablePanel
         className="h-[450px] border border-border rounded-md mr-4"
          defaultSize={30}
          minSize={20}
          maxSize={50}
        >
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <ScrollArea className="h-[450px]  rounded-md   ">
                <div className="flex flex-col items-center h-full  ">
                  <h4 className="mb-4 text-xl font-sfpro text-center mt-4 mx-auto   dark:bg-background py-4 capitalize">
                    Invited{" "}
                  </h4>

                  <InvitedSpaceLists />
         
                </div>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>        
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
export default SpaceHome;
