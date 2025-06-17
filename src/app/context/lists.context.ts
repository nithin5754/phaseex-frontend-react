import { Context, createContext } from "react";
import { IListsContext } from "./interface.context";

export const ListsContext: Context<IListsContext> = createContext(
  {
    
    isLoading:false,
    isError:false,
     isCurrentUserManager:false,
  isManagerExists:false
  }
) as unknown as Context<IListsContext>;
