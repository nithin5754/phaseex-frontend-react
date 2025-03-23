
import { ISpaceWorksContext } from "@/features/spaces/types/context.space";
import { Context,createContext } from "react";



// getAllOwnerSpaces
// getAllInvitedSpaces
// getAllHiddenSpaces

export const MembersContext: Context<ISpaceWorksContext> = createContext({

  getAllOwnerSpaces:[],
  getAllInvitedSpaces:[],
  getAllHiddenSpaces:[],
  handleHideSubmit: () => Promise<void>

}) as unknown  as Context<ISpaceWorksContext>

