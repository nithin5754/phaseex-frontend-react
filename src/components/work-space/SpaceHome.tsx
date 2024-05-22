import { LottieAnimation } from "../lootie/Lootie";

import emptyLootieWorkSpace from "../../../public/json/empty-space-1.json";
import { ResponseWorkspaceDataType } from "@/app/api/spaceApi";
import { HiddenSpace, OnGoingSideBar } from "./index";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 p-4 lg:order-1 ">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-sfpro ">All Galaxy</h1>
          <button className="bg-slate-600 text-white text-sm px-2 py-1 rounded-lg">
            + New Galaxy
          </button>
        </div>

        {allSpaces.length > 0 && !allSpaces.every((space) => space.active) ? (
          <div className="flex flex-wrap gap-2 m-auto justify-around items-center py-4 min-h-[350px] bg-white border border-gray-200 rounded-lg ">
            {allSpaces.map((space) => {
              return (
                <HiddenSpace
                  space={space}
                  handleHideSubmit={handleHideSubmit}
                />
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
        )}

        <div className="flex items-center justify-center">
          {allSpaces.length > 0 &&
            !allSpaces.every((space) => space.active) && (
              <div className="pagination flex items-center space-x-2">
                <Button
                  className="p-1 text-sm w-12 bg-slate-500 text-[12px] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </Button>
                <span className="text-sm">{currentPage}</span>
                <Button
                  className="p-1 text-sm w-12 bg-slate-500 text-[12px] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
        </div>
      </div>

      <OnGoingSideBar
        getOnGoingSpace={getOnGoingSpace ? getOnGoingSpace : []}
        handleHideSubmit={handleHideSubmit}
      />
    </div>
  );
};
export default SpaceHome;
