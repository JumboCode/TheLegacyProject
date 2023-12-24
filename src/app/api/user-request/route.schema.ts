import { z } from "zod";
import { unknownErrorSchema } from "@api/route.schema";

export const JoinChapterRequest = z.object({
  chapterId: z.string(),
});

export const JoinChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({ code: z.literal("INVALID_REQUEST"), message: z.string() }),
  unknownErrorSchema
]);
