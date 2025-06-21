import { z } from "zod";

export const formSchema = z.object({
  messages: z
    .array(z.string().min(1, "Message cannot be empty"))
    .min(1, "At least one message is required"),
  file: z
    .any()
    .refine((file) => file instanceof File, {
      message: "File is required",
    })
    .refine((file) => file?.size <= 5 * 1024 * 1024, {
      message: "File must be under 5MB",
    })
    .refine(
      (file) =>
        ["application/pdf", "image/png", "image/jpeg"].includes(file?.type),
      {
        message: "Only PDF, PNG, or JPEG files are allowed",
      }
    ).optional()
});
