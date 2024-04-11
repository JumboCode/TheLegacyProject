import { z } from "zod";

export const EditSeniorRequest = z.object({
  SeniorIDs: z.array(z.string()),
});

export const EditSeniorResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.string(),
  }),
  z.object({
    code: z.literal("INVALID_REQUEST"),
    message: z.string(),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.string(),
  }),
]);
