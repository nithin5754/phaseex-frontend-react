import { z } from "zod";

export const reviewSubmitSchema = z.object({
  suggestion: z.string().min(2, {
    message: "Suggestion must be at least 2 characters.",
  }),
})
