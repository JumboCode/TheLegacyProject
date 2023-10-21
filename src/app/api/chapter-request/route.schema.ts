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
  phoneNumber: z.string(),
  university: z.string(),
  universityAddress: z.string(),
  leadershipExperience: z.string(),
  motivation: z.string(),
  availabilities: z.string(),
  questions: z.string(),
});

export const ChapterRequestResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Chapter request successfully submitted"),
    data: z.any(),
  }),
  z.object({
    code: z.literal("INVALID_FIRST_NAME"),
    message: z.literal("Invalid first name provided"),
  }),
  z.object({
    code: z.literal("INVALID_LAST_NAME"),
    message: z.literal("Invalid last name provided"),
  }),
  z.object({
    code: z.literal("INVALID_EMAIL"),
    message: z.literal("Invalid email provided"),
  }),
  z.object({
    code: z.literal("INVALID_PHONE_NUMBER"),
    message: z.literal("Invalid phone number provided"),
  }),
  z.object({
    code: z.literal("INVALID_UNIVERSITY"),
    message: z.literal("Invalid university name provided"),
  }),
  z.object({
    code: z.literal("INVALID_UNIVERSITY_ADDRESS"),
    message: z.literal("Invalid university address provided"),
  }),
  z.object({
    code: z.literal("INVALID_LEADERSHIP_EXPERIENCE"),
    message: z.literal("Invalid leadership experience provided"),
  }),
  z.object({
    code: z.literal("INVALID_MOTIVATION"),
    message: z.literal("Invalid motivation provided"),
  }),
  z.object({
    code: z.literal("INVALID_AVAILABILITY"),
    message: z.literal("Invalid availability provided"),
  }),
  z.object({
    code: z.literal("INVALID_QUESTION"),
    message: z.literal("Invalid question provided"),
  }),
  z.object({
    code: z.literal("UNKNOWN"),
    message: z.literal("Invalid request, unknown error"),
  }),
  z.object({
    code: z.literal("DUPLICATE_EMAIL"),
    message: z.literal(
      "A chapter request associated with this email already exists"
    ),
  }),
]);
