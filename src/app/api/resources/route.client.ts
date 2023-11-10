import { z } from "zod";
import {
  BatchCreateRequestSchema,
  BatchCreateResponseSchema,
} from "./route.schema";

interface IBatchCreateRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof BatchCreateRequestSchema>;
}

export const batchCreateResources = async (request: IBatchCreateRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources/", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return BatchCreateResponseSchema.parse(json);
};
