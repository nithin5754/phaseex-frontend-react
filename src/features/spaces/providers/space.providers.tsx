
import { Context,createContext } from "react";
import { ISpaceWorksContext } from "../types/context.space";


// getAllOwnerSpaces
// getAllInvitedSpaces
// getAllHiddenSpaces

export const WorkSpaceContext: Context<ISpaceWorksContext> = createContext({

  getAllOwnerSpaces:[],
  getAllInvitedSpaces:[],
  getAllHiddenSpaces:[],
  handleHideSubmit: () => Promise<void>

}) as unknown  as Context<ISpaceWorksContext>

