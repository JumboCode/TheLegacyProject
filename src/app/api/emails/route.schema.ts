import { z } from "zod";
import { Prisma } from "@prisma/client";

export const Email = z.object({
  email: z.string().email("This is not a valid email"),
}) satisfies z.ZodType<Prisma.EmailCreateInput>;

export const EmailResponse = z.discriminatedUnion("code", [
  z.object({
    code: z.literal("SUCCESS"),
    message: z.literal("Email successfully submitted"),
  }),
  z.object({
    code: z.literal("INVALID_EMAIL"),
    message: z.literal("Invalid email submission"),
  }),
  z.object({
    code: z.literal("DUPLICATE_EMAIL"),
    message: z.literal("This email already exists"),
  }),
]);
