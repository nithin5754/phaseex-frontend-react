import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";
import useAuth from "./useAuth";

interface Props {
  workspaceId: string | null;
}

const UseSpaceRoles = ({ workspaceId }: Props) => {
  if (workspaceId) {
    const { data: getSingleSpace } = useGetSingleWorkSpaceQuery(workspaceId);

    const userId = useAuth();

    if (!getSingleSpace) {
      return false;
    }

    if (getSingleSpace.workspaceOwner === userId?.userId) {
      return true;
    } else {
      return false;
    }
  }
};
export default UseSpaceRoles;
