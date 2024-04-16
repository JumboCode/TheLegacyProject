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
  firstName: z
    .string()
    .min(1, "Please provide a first name")
    .max(100, "You can provide at most 100 characters"),
  lastName: z
    .string()
    .min(1, "Please provide a last name")
    .max(100, "You can provide at most 100 characters"),
  universityEmail: z.string().max(100).email("Please provide a valid email"),
  phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
  university: z
    .string()
    .min(1, "Please provide a university")
    .max(100, "You can provide at most 100 characters"),
  universityAddress: z
    .string()
    .min(1, "Please provide an address")
    .max(100, "You can provide at most 100 characters"),
  leadershipExperience: z
    .string()
    .min(1, "Please state some leadership experience")
    .max(250, "You can provide at most 250 characters"),
  motivation: z
    .string()
    .min(1, "Please describe your motivation in joining the Legacy Project")
    .max(250, "You can provide at most 250 characters"),
  // TODO: Figure out if availabilities should have a better type
  availabilities: z
    .string()
    .min(1, "Please provide some availability")
    .max(100, "You can provide at most 100 characters"),
  questions: z.string().max(100, "You can provide at most 100 characters"),
}) satisfies z.ZodType<Prisma.ChapterRequestCreateInput>;

export const ChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Chapter request successfully submitted"),
  }),
  z.object({
    code: z.literal("INVALID_FORM"),
    message: z.literal("Invalid form submission"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Unknown error received"),
  }),
  z.object({
    code: z.literal("DUPLICATE_EMAIL"),
    message: z.literal(
      "A chapter request associated with this email already exists"
    ),
  }),
]);
