import { z } from "zod";
import {
  JoinChapterRequest,
  ManageChapterRequest,
  JoinChapterRequestResponse,
  ManageChapterRequestResponse,
} from "./route.schema";

interface IJoinChapterRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof JoinChapterRequest>;
}

interface IManageChapterRequest extends Omit<RequestInit, "body"> {
  body: z.infer<typeof ManageChapterRequest>;
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

export const handleManageChapterRequest = async (
  request: IManageChapterRequest
) => {
  const { body, ...options } = request;
  console.log("body", body);
  const response = await fetch("/api/user-request", {
    method: "DELETE",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return ManageChapterRequestResponse.parse(json);
};

export const handleAcceptChapterRequest = async (
  request: IManageChapterRequest
) => {
  const { body, ...options } = request;
  const response = await fetch("/api/user-request", {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return ManageChapterRequestResponse.parse(json);
};
