import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";
import useAuth from "./useAuth";

interface Props {
  workspaceId: string|undefined;
}

const UseSpaceRoles = ({ workspaceId }: Props) => {
  if (!workspaceId) return false;

  const { data: getSingleSpace } = useGetSingleWorkSpaceQuery(workspaceId, {
    skip: !workspaceId,
  });

  const userId = useAuth();

  if (!getSingleSpace) {
    return false;
  }

  if (getSingleSpace.workspaceOwner === userId?.userId) {
    return true;
  } else {
    return false;
  }
};
export default UseSpaceRoles;
