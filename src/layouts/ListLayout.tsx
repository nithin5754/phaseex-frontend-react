import { ListsContext } from "@/app/context/lists.context";
import { useGetSingleListQuery } from "@/app/redux/api/listapi";
import UseListManagerRole from "@/hooks/useListManagerRoles";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

const ListLayout = () => {
  const { folderId, listId, id } = useParams();
  const [isManagerExists, setManagerExist] = useState<boolean>(false);

  const isCurrentUserManager: boolean = UseListManagerRole({
    workspaceId: id as string,
    folderId: folderId as string,
    listId: listId as string,
  });

  const {
    data: list,
    isLoading,
    isError,
  } = useGetSingleListQuery(
    {
      workspaceId: id as string,
      folderId: folderId as string,
      listId: listId as string,
    },
    {
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (list?.list_collaborators) {
      const hasManager = list?.list_collaborators.some(
        (collaborator) => collaborator.role === "manager"
      );
      setManagerExist(hasManager);
    }
  }, [list, isLoading, isManagerExists]);

  if (!id || !folderId || !listId) {
    return <h1>loading...</h1>;
  }

  return (
    <ListsContext.Provider
      value={{
        workspaceId: id,
        folderId,
        listId,
        lists: list,
        isLoading,
        isError,
        isCurrentUserManager,
        isManagerExists,
      }}
    >
      <Outlet />
    </ListsContext.Provider>
  );
};
export default ListLayout;
