import { Prisma } from "@prisma/client";
import z from "zod";

const RoleSchema = z.enum(["USER", "CHAPTER_LEADER", "ADMIN"]);

/**
 * TODO - What should the maximum length of title be?
 */
export const ResourceSchema = z.object({
  access: z
    .array(RoleSchema)
    .refine((roles) => new Set(roles).size === roles.length, {
      message: "Duplicated roles",
    }),
  link: z.string().url(),
  title: z.string().min(1),
}) satisfies z.ZodType<Prisma.ResourceCreateInput>;

export const BatchCreateRequestSchema = z.array(ResourceSchema);

export const BatchCreateResponseSchema = z.object({
  code: z.literal("SUCCESS"),
  resources: z.array(ResourceSchema),
});
