import { z } from "zod";
import { unauthorizedErrorSchema, unknownErrorSchema } from "@api/route.schema";

export const File = z.object({
  date: z.string().transform((val) => {
    const date = new Date(val);
    date.setHours(0, 0, 0, 0);
    return date;
  }),
  filetype: z.string(),
  url: z.string(),
  Tags: z.array(z.string()),
  seniorId: z.string(),
});

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
    code: z.literal("INVALID_URL"),
    message: z.literal("Invalid file ID parsed from url"),
  }),
  z.object({
    code: z.literal("NO_SENIOR"),
    message: z.literal("Senior does not exist"),
  }),
  z.object({
    code: z.literal("NO_FILE"),
    message: z.literal("File does not exist"),
  }),
  z.object({
    code: z.literal("NO_USER"),
    message: z.literal("User does not exist"),
  }),
]);

export const ResponsefileDelete = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({
    code: z.literal("NOT_FOUND"),
    message: z.string(),
  }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);
