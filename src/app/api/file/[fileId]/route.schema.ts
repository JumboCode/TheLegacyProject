import { z } from "zod";

export const FileResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
  z.object({
    code: z.literal("NOT_AUTHORIZED"),
    message: z.literal("Senior not assigned to user"),
  }),
  z.object({
    code: z.literal("SUCCESS_UPDATE"),
    message: z.literal("File successfully updated"),
  }),
  z.object({
    code: z.literal("SUCCESS_DELETE"),
    message: z.literal("File successfully deleted"),
  }),
  z.object({
    code: z.literal("INVALID_REQUEST"),
    message: z.literal("Not a valid request"),
  }),
]);
