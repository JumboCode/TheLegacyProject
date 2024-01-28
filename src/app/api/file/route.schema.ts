import { z } from "zod";
import { Prisma } from "@prisma/client";
import { unauthorizedErrorSchema, unknownErrorSchema } from "@api/route.schema";
/*
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  date         DateTime // will restrict hours to midnight 
  filetype     String
  url          String
  seniorId     String   @db.ObjectId
  senior       Senior   @relation(fields: [seniorId], references: [id], onDelete: Cascade)
  Tags         String[]

  @@unique([seniorId, date])
*/

export const File = z.object({
  date: z.date(),
  filetype: z.string(),
  url: z.string(),
  Tags: z.array(z.string()),
  seniorId: z.string(),
});

export const FileResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("File successfully added"),
  }),
  z.object({
    code: z.literal("INVALID_FILE"),
    message: z.literal("Invalid file added"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
  z.object({
    code: z.literal("DUPLICATE_DATE"),
    message: z.literal("A file associated with this date already exists"),
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
