


import { useGetAllTodoCollabByIdQuery } from "@/app/redux/api/todoapi";

import {MembersTodoSingleCollab} from "./index";

interface Props {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId:string;
  todoId:string
}

const MembersTodoCollabPage = ({ workspaceId, folderId, listId,taskId,todoId }: Props) => {
  const { data: getAllTodoCollabById } = useGetAllTodoCollabByIdQuery({
    workspaceId,
    folderId,
    listId,
    taskId,
    todoId
  });


  

  return (
<>


<ul className="w-full mt-4 min-h-[365px]">
      {getAllTodoCollabById?.map((collabList:any) => {

        let checkingDetails={
          workspaceId,
          folderId,
          listId,
          taskId,
          todoId,
          collabId:collabList.id
        }
         
        return (

        <MembersTodoSingleCollab collabList={collabList} checkingDetails={checkingDetails} />

   

        
        );
      })}
    </ul>

</>
  );
};
export default MembersTodoCollabPage;
