import { z } from "zod";
import {
  unauthorizedErrorSchema,
  unknownErrorSchema,
} from "../../route.schema";

export const seniorDeleteResponse = z.discriminatedUnion("code", [
  z.object({ code: z.literal("SUCCESS") }),
  z.object({
    code: z.literal("NOT_FOUND"),
    message: z.string(),
  }),
  unknownErrorSchema,
  unauthorizedErrorSchema,
]);
