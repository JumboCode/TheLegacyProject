import { z } from "zod";
import {
  batchCreateRequestSchema,
  batchUpdateRequestSchema,
  batchResponseSchema,
} from "./route.schema";

interface IBatchCreateRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof batchCreateRequestSchema>;
}

interface IBatchUpdateRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof batchUpdateRequestSchema>;
}

export const batchCreateResources = async (request: IBatchCreateRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources/", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  try {
    return batchResponseSchema.parse(json);
  } catch (error) {
    console.log(error);
    throw new Error("Uncaught error");
  }
};

export const batchUpdateResources = async (request: IBatchUpdateRequest) => {
  const { body, ...options } = request;
  const response = await fetch("/api/resources", {
    method: "PUT",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  try {
    return batchResponseSchema.parse(json);
  } catch (error) {
    console.log(error);
    throw new Error("Uncaught error");
  }
};
