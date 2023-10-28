import { z } from "zod";
import {
  unauthorizedErrorSchema,
  unknownErrorSchema,
} from "../../route.schema";
import { Prisma } from "@prisma/client";

export const seniorDeleteResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({
    code: z.literal("NOT_FOUND"),
    message: z.string(),
  }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);

export const seniorSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  StudentIDs: z.array(z.string()),
  folder: z.string()
}) satisfies z.ZodType<Prisma.SeniorCreateInput>;

export const patchSeniorSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
  StudentIDs: z.array(z.string())
})

export type ISeniorSchema = z.infer<typeof seniorSchema>

export type IPatchSeniorRequestSchema = z.infer<typeof patchSeniorSchema>

export const seniorPatchResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS"), data: seniorSchema}),
  z.object({
    code: z.literal("NOT_FOUND"),
    message: z.string(),
  }),
  z.object({code: z.literal("INVALID_EDIT")}),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);





// export const seniorGetResponse = z.discriminatedUnion("code", [

//   z.object({ code: z.literal("SUCCESS"), data: getSeniorSchema }),
//   z.object({
//     code: z.literal("NOT_FOUND"),
//     message: z.string(),
//   }),
//   unknownErrorSchema,
//   unauthorizedErrorSchema,

// ]);