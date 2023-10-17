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
  universityEmail: z.string(),
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
  }),
]);
