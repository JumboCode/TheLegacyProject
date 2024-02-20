import { z } from "zod";

export const FileResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("File successfully added"),
  }),
  z.object({
    code: z.literal("NOT_AUTHORIZED"),
    message: z.literal("Senior not assigned to user"),
  }),
  z.object({
    code: z.literal("INVALID_REQUEST"),
    message: z.literal("Not a valid request"),
  }),
]);
