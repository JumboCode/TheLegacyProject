import { z } from "zod";
import { JoinChapterRequest, JoinChapterRequestResponse } from "./route.schema";

type IJoinChapterRequest = z.infer<typeof JoinChapterRequest>;

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: IJoinChapterRequest;
}

export const handleJoinChapterRequest = async (
  request: IRequest,
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
