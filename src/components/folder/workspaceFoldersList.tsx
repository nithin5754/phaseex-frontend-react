import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";
import { HoverEffect } from "../aceternityuI/index";


interface Props {
   hiddenProjects:ResponseWorkspaceDataType[],
   handleHideSubmit: (id: string) => Promise<any>; 
}

export function WorkSpaceFolderList({hiddenProjects,handleHideSubmit}:Props) {
  const projects =hiddenProjects.map((space:ResponseWorkspaceDataType) => {
    return (
     {
  title:space.title,
  description:space.workspace_description,
  handleHideSubmit:handleHideSubmit,
  id:space.id,
  type:space.workspaceType
  ,
  link: "/",
  }
    )
  })
  
  return (

   

    <div className="max-w-5xl  mx-auto px-8">
      <HoverEffect items={projects} />
    </div>
  );
}





