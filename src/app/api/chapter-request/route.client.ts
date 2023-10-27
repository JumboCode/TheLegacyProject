import { z } from "zod";
import { ChapterRequest, ChapterRequestResponse } from "./route.schema";

/**
 * Describe the interface of SignInRequest.
 */
type IChapterRequest = z.infer<typeof ChapterRequest>;

type IChapterRequestResponse = z.infer<typeof ChapterRequestResponse>;

/**
 * Extract all the values of "code".
 */
type ChapterRequestResponseCode = z.infer<
  typeof ChapterRequestResponse
>["code"];

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: IChapterRequest;
}

const MOCK_SUCCESS: IChapterRequestResponse = {
  code: "SUCCESS",
  message: "Chapter request successfully submitted",
};

const MOCK_DUPLICATE_EMAIL: IChapterRequestResponse = {
  code: "DUPLICATE_EMAIL",
  message: "A chapter request associated with this email already exists",
};

const MOCK_UNKNOWN: IChapterRequestResponse = {
  code: "UNKNOWN",
  message: "Unknown error received",
};

const MOCK_INVALID_FORM: IChapterRequestResponse = {
  code: "INVALID_FORM",
  message: "Invalid form submission",
};

/**
 * If "mock" is given as a parameter, the function can return mocked data for a specific case. This
 * pattern allows frontend developers to use your API before you finished implementing it!
 *
 * In addition, using Zod schemas to parse the response will make the input/output well-typed, making the code cleaner.
 */
export const chapterRequest = async (
  request: IRequest,
  mock?: ChapterRequestResponseCode
) => {
  if (mock === "SUCCESS") {
    return ChapterRequestResponse.parse(MOCK_SUCCESS);
  } else if (mock === "INVALID_FORM") {
    return ChapterRequestResponse.parse(MOCK_INVALID_FORM);
  } else if (mock === "DUPLICATE_EMAIL") {
    return ChapterRequestResponse.parse(MOCK_DUPLICATE_EMAIL);
  } else if (mock === "UNKNOWN") {
    return ChapterRequestResponse.parse(MOCK_UNKNOWN);
  }
  console.log("here");
  const { body, ...options } = request;
  const response = await fetch("/api/chapter-request", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return ChapterRequestResponse.parse(json);
};
