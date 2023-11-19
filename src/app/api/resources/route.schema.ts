import { Prisma } from "@prisma/client";
import z from "zod";

const roleSchema = z.enum(["USER", "CHAPTER_LEADER", "ADMIN"]);

/**
 * TODO - What should the maximum length of title be?
 */
export const resourceSchema = z.object({
  access: z
    .array(roleSchema)
    .refine((roles) => new Set(roles).size === roles.length, {
      message: "Duplicated roles",
    }),
  link: z.string().url(),
  title: z.string().min(1),
}) satisfies z.ZodType<Prisma.ResourceCreateInput>;

export const batchCreateRequestSchema = z.array(resourceSchema);

export const batchUpdateRequestSchema = z.array(
  resourceSchema.extend({
    id: z.string(),
  })
);

export const IDResourceSchema = z.object({
  id: z.string(),
});
export const batchDeleteRequestSchema = z.array(IDResourceSchema);

export const batchResponseSchema = z.object({
  code: z.literal("SUCCESS"),
});
