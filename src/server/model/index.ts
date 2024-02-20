import { Senior } from "@prisma/client";
import { z } from "zod";

export const seniorSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  StudentIDs: z.array(z.string()),
  folder: z.string(),
  ChapterID: z.string(),
}) satisfies z.ZodType<Senior>;