import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";

import { BentoGrid, BentoGridItem } from "../aceternityuI/cards/bento-grid";



interface Props {
   hiddenProjects:ResponseWorkspaceDataType[],
   handleHideSubmit: (id: string) => Promise<any>; 
}

export function WorkSpaceFolderList({hiddenProjects,handleHideSubmit}:Props) {
  const items =hiddenProjects.map((space:ResponseWorkspaceDataType) => {
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

   

    
    <BentoGrid className="flex flex-wrap justify-center  transition-all duration-1000 ease-out">
    {items.map((item, i) => (
      <BentoGridItem
        key={i}
        title={item.title}
        description={item.description} id={item?.id} handleHideSubmit={ handleHideSubmit}
        type={item.type}
      />
    ))}
  </BentoGrid>
  
  );
}





