import useAuth from "./useAuth";
import { useMemo } from "react";
import { useGetSingleListQuery } from "@/app/redux/api/listapi";

interface Props {
  workspaceId: string;
  folderId: string;
  listId: string;
}

const UseListManagerRole = ({ workspaceId, folderId, listId }: Props) => {
  const currentUser = useAuth();

  const { data: getSingleList } = useGetSingleListQuery(
    { workspaceId, folderId, listId },
    {
      skip: !workspaceId || !folderId || !listId,
    }
  );

  const isManager: boolean = useMemo(() => {
    if (
      !getSingleList ||
      !currentUser?.userId ||
      !getSingleList.list_collaborators
    ) {
      return false;
    }

    return getSingleList.list_collaborators.some(
      (collaborator) =>
        collaborator.role === "manager" &&
        collaborator.assignee === currentUser.userId
    );
  }, [getSingleList, currentUser?.userId]);

  return isManager;
};

export default UseListManagerRole;
