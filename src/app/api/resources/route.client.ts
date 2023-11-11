import { z } from "zod";
import {
  batchCreateRequestSchema,
  batchCreateResponseSchema,
} from "./route.schema";

interface IBatchCreateRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof batchCreateRequestSchema>;
}

export const batchCreateResources = async (request: IBatchCreateRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources/", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return batchCreateResponseSchema.parse(json);
};
