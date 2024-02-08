import { z } from "zod";
import { unknownErrorSchema } from "@api/route.schema";

export const JoinChapterRequest = z.object({
  chapterId: z.string(),
});

export const ManageChapterRequest = z.object({
  userId: z.string(),
});

export const JoinChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({ code: z.literal("INVALID_REQUEST"), message: z.string() }),
  unknownErrorSchema,
]);

export const ManageChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({ code: z.literal("UNAUTHORIZED_REQUEST"), message: z.string() }),
  z.object({ code: z.literal("INVALID_REQUEST"), message: z.string() }),
  unknownErrorSchema,
]);
