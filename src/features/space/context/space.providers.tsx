
import { Context,createContext } from "react";
import { ISpaceWorksContext } from "../types/context.space";

export const WorkSpaceContext: Context<ISpaceWorksContext> = createContext({

  getAllSpaces:[],
  getOnGoingSpace:[],
  handleHideSubmit: () => Promise<void>

}) as unknown  as Context<ISpaceWorksContext>

