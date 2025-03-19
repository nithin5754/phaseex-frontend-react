import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";

export interface ISpaceWorksContext {
  getAllSpaces: ResponseWorkspaceDataType[];
 getOnGoingSpace: ResponseWorkspaceDataType[];
 handleHideSubmit: (id: string) => Promise<void>
 isSuccess?: boolean;
 isLoading?: boolean;
}