import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";

export interface ISpaceWorksContext {
 getAllOwnerSpaces:ResponseWorkspaceDataType[],
 getAllInvitedSpaces:ResponseWorkspaceDataType[],
 getAllHiddenSpaces:ResponseWorkspaceDataType[],
 handleHideSubmit: (id: string) => Promise<void>
 isSuccess?: boolean;
 isLoading?: boolean;
}