import { Context, createContext } from "react";
import { IAddReviewContext } from "./interface.context";

export const ReviewAddContext: Context<IAddReviewContext> = createContext(
  {}
) as unknown as Context<IAddReviewContext>;
