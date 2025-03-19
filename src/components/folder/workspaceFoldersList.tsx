import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";
import { WorkSpaceContext } from "@/features/space/context/space.providers";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { DeleteWS, PopOverWorkSpace } from "../work-space";

export function WorkSpaceFolderList() {
  const { getAllSpaces: hiddenProjects, handleHideSubmit } =
    useContext(WorkSpaceContext);

  const items = hiddenProjects.map((space: ResponseWorkspaceDataType) => {
    return {
      ...space,
      title: space.title,
      description: space.workspace_description,
      handleHideSubmit: handleHideSubmit,
      id: space.id,
      type: space.workspaceType,
      link: "/",
    };
  });

  return (
    <ul className="w-full p-4">
      {items.map((space) => {
      
        let color = "bg-orange-400";

        if (/^([a-c])/i.test(space.title[0].toLowerCase())) {
          color = "bg-blue-400";
        } else if (/^([d-g])/i.test(space.title[0].toLowerCase())) {
          color = "bg-green-400";
        } else if (/^([h-k])/i.test(space.title[0].toLowerCase())) {
          color = "bg-yellow-400";
        } else if (/^([l-o])/i.test(space.title[0].toLowerCase())) {
          color = "bg-red-400";
        } else if (/^([p-z])/i.test(space.title[0].toLowerCase())) {
          color = "bg-purple-400";
        }
        const truncateTitle = (title: string) => {
          return title.length > 10 ? title.substring(0, 10) + "..." : title;
        };

        return (
          <li
            key={space.id}
            className="mb-2 w-full flex justify-between   hover:bg-slate-100 hover:rounded-md px-3 dark:hover:bg-secondary"
          >
            <div className="flex ">
              <div className="flex flex-row gap-2 my-auto p-2">
                <div
                  className={`w-6 h-6 ${color} rounded-full flex items-center justify-center text-[14px] font-sfpro hover:bg-slate-600 dark:hover:bg-secondary`}
                >
                  {space.title[0].toUpperCase()}
                </div>
         
                  <span>{truncateTitle(space.title)}</span>
             
              </div>
            </div>

            <>
              <div className="flex items-center justify-center gap-4">
                <DeleteWS workspaceId={space.id} />
                <PopOverWorkSpace
                  handleHideSubmit={handleHideSubmit}
                  id={space.id}
                  text={"Do yo want make this hidden ?"}
                />
              </div>
            </>
          </li>
        );
      })}
    </ul>
  );
}
