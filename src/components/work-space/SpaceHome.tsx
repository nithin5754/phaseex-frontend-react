import { LottieAnimation } from "../lootie/Lootie";

import emptyLootieWorkSpace from "../../../public/json/empty-space-1.json";

import { OnGoingSideBar } from "./index";

import { WorkSpaceFolderList } from "../../components/folder/index";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { ScrollArea } from "../ui/scroll-area";

import { FC, ReactElement, useContext } from "react";
import { WorkSpaceContext } from "@/features/space/context/space.providers";
import { OpenModal } from "../modal/box-modal-settings";
import { PlusCircleIcon } from "lucide-react";



const SpaceHome: FC = (): ReactElement => {
  const {
    getAllSpaces: allSpaces,
  } = useContext(WorkSpaceContext);

  return (
    <div className=" ">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-sfpro font-bold capitalize">All Galaxy</h1>
        <div className="w-[100px] "><OpenModal title={"create"} icon={PlusCircleIcon} /></div>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border-0  p-4  h-[450px]"
      >
        <ResizablePanel
          defaultSize={50}
          minSize={30}
          maxSize={75}
          className="h-[450px] dark:border dark:border-border rounded-md mr-4"
        >
          <ScrollArea className="h-[450px]  rounded-md   ">
            <div className="p-4   ">
              <h4 className="mb-4 text-xl  font-sfpro leading-none sticky  top-0  dark:bg-background py-4">
                Hidden and Completed{" "}
              </h4>
              {allSpaces.length > 0 &&
              !allSpaces.every((space) => space.active) ? (
                <>
                  <WorkSpaceFolderList />
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
                      All Galaxy completed, joined, hidden
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle style={{ backgroundColor: "transparent" }} />

        <ResizablePanel className="min-h-[450px] dark:border dark:border-border rounded-md">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
            <ScrollArea className="h-[450px]  rounded-md   ">
            <div className="flex flex-col items-center h-full  ">
                <h4 className="mb-4 text-xl font-sfpro text-center mt-4 mx-auto  dark:bg-background py-4">
                  On Going Galaxy{" "}
                </h4>

                <OnGoingSideBar />
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
