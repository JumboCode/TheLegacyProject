import { z } from "zod";
import {
  JoinChapterRequest,
  JoinChapterRequestResponse,
  UndoChapterRequestResponse,
} from "./route.schema";

interface IJoinChapterRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof JoinChapterRequest>;
}

export const handleJoinChapterRequest = async (
  request: IJoinChapterRequest
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/user-request", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return JoinChapterRequestResponse.parse(json);
};

export const handleUndoChapterRequest = async (
  request: Omit<RequestInit, "body"> = {}
) => {
  const response = await fetch("/api/user-request", {
    method: "DELETE",
    ...request,
  });
  const json = await response.json();
  return UndoChapterRequestResponse.parse(json);
};
