import { useGetAllCountQuery } from "@/app/redux/api/commentApi";

interface Props {
  workspaceId:string
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string;
}

const Count = ({workspaceId,folderId,listId,taskId,todoId}:Props) => {
  const { data: getAllCount } = useGetAllCountQuery({workspaceId,folderId,listId,taskId,todoId},{
    pollingInterval:60000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });

  return <div className="font-sfpro text-3xl mb-2">Discussion ({getAllCount})</div>;
};
export default Count;
