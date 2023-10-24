import { Prisma } from "@prisma/client";
import { z } from "zod";

/*
  firstName            String
  lastName             String
  universityEmail      String    @unique
  phoneNumber          String
  university           String
  universityAddress    String
  leadershipExperience String
  motivation           String
  availabilities       String
  questions            String
*/
export const ChapterRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  universityEmail: z.string().email("This is not a valid email"),
  phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
  university: z.string(),
  universityAddress: z.string(),
  leadershipExperience: z.string(),
  motivation: z.string(),
  availabilities: z.string(),
  questions: z.string(),
}) satisfies z.ZodType<Prisma.ChapterRequestCreateInput>;

export const ChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Chapter request successfully submitted"),
    data: z.any(),
  }),
  z.object({
    code: z.literal("INVALID_FORM"),
    message: z.literal("Invalid form submission"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    data: z.any(),
  }),
  z.object({
    code: z.literal("DUPLICATE_EMAIL"),
    message: z.literal(
      "A chapter request associated with this email already exists"
    ),
  }),
]);
