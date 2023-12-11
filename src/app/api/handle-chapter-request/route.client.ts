import { z } from "zod";
import {
  HandleChapterRequest,
  HandleChapterRequestResponse,
} from "./route.schema";

/**
 * Describe the interface of SignInRequest.
 */
type IHandleChapterRequest = z.infer<typeof HandleChapterRequest>;

type IHandleChapterRequestResponse = z.infer<
  typeof HandleChapterRequestResponse
>;

/**
 * Extract all the values of "code".
 */
type HandleChapterRequestResponseCode = z.infer<
  typeof HandleChapterRequestResponse
>["code"];

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: IHandleChapterRequest;
}

const MOCK_SUCCESS: IHandleChapterRequestResponse = {
  code: "SUCCESS",
  message: "Chapter request successfully handled",
};

const MOCK_INVALID_REQUEST: IHandleChapterRequestResponse = {
  code: "INVALID_REQUEST",
  message: "Invalid API request",
};

const MOCK_UNKNOWN: IHandleChapterRequestResponse = {
  code: "UNKNOWN",
  message: "Unknown error received",
};

const MOCK_CHAPTER_REQUEST_NOT_FOUND: IHandleChapterRequestResponse = {
  code: "CHAPTER_REQUEST_NOT_FOUND",
  message: "A chapter request associated with the given ID does not exist",
};

/**
 * If "mock" is given as a parameter, the function can return mocked data for a specific case. This
 * pattern allows frontend developers to use your API before you finished implementing it!
 *
 * In addition, using Zod schemas to parse the response will make the input/output well-typed, making the code cleaner.
 */
export const handleChapterRequest = async (
  request: IRequest,
  mock?: HandleChapterRequestResponseCode
) => {
  if (mock === "SUCCESS") {
    return HandleChapterRequestResponse.parse(MOCK_SUCCESS);
  } else if (mock === "INVALID_REQUEST") {
    return HandleChapterRequestResponse.parse(MOCK_INVALID_REQUEST);
  } else if (mock === "UNKNOWN") {
    return HandleChapterRequestResponse.parse(MOCK_UNKNOWN);
  } else if (mock === "CHAPTER_REQUEST_NOT_FOUND") {
    return HandleChapterRequestResponse.parse(MOCK_CHAPTER_REQUEST_NOT_FOUND);
  }
  const { body, ...options } = request;
  const response = await fetch("/api/handle-chapter-request", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return HandleChapterRequestResponse.parse(json);
};
