import { useMemo } from "react";
import useAuth from "./useAuth";
import { useGetSingleTaskQuery } from "@/app/redux/api/taskapi";
import { useGetSingleListQuery } from "@/app/redux/api/listapi";
import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";

interface Props {
  workspaceId?: string;
  folderId?: string;
  listId?: string;
  taskId?: string;
}

interface ReceiveRoles {
  developer: boolean;
  manager: boolean;
  owner: boolean;
  viewer: boolean;
}

const useRolePermission = ({
  workspaceId,
  folderId,
  listId,
  taskId,
}: Props): ReceiveRoles => {
  const currentUser = useAuth();

  const { data: taskData } = useGetSingleTaskQuery(
    {
      workspaceId: workspaceId as string,
      folderId: folderId as string,
      listId: listId as string,
      taskId: taskId as string,
    },
    { skip: !workspaceId || !folderId || !listId || !taskId }
  );

  const { data: listData } = useGetSingleListQuery(
    {
      workspaceId: workspaceId as string,
      folderId: folderId as string,
      listId: listId as string,
    },
    { skip: !workspaceId || !folderId || !listId }
  );

  const { data: workspaceData } = useGetSingleWorkSpaceQuery(
    workspaceId as string,
    { skip: !workspaceId }
  );

  const roles = useMemo(() => {
    const userId = currentUser?.userId;
    let developer = false;
    let manager = false;
    let owner = false;
    let viewer = false;

    const checkRoles = (collaborators: any[]) => {
      collaborators?.forEach((collab) => {
        if (collab.assignee === userId) {
          if (collab.role === "developer") developer = true;
          if (collab.role === "manager") manager = true;

          if (collab.role === "viewer") viewer = true;
        }
      });
    };

    if (taskData) {
      checkRoles(taskData.task_collaborators);
    }

    if (listData) {
      checkRoles(listData.list_collaborators);
    }

    if (workspaceData) {
  
      owner = currentUser?.userId === workspaceData.workspaceOwner;
    }

    return { developer, manager, owner, viewer };
  }, [taskData, listData, workspaceData, currentUser?.userId]);

  return roles;
};

export default useRolePermission;
