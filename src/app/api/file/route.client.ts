import { z } from "zod";
import { File, FileResponse } from "./route.schema";

/**
 * Describe the interface of SignInRequest.
 */
type IFile = z.infer<typeof File>;

type IFileResponse = z.infer<typeof FileResponse>;

/**
 * Extract all the values of "code".
 */
type FileResponseCode = z.infer<typeof FileResponse>["code"];

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: IFile;
}

const MOCK_SUCCESS: IFileResponse = {
  code: "SUCCESS",
  message: "File successfully added",
};

const MOCK_UNKNOWN: IFileResponse = {
  code: "UNKNOWN",
  message: "Unknown error received",
};

const MOCK_INVALID_FILE: IFileResponse = {
  code: "INVALID_FILE",
  message: "Invalid file added",
};

/**
 * If "mock" is given as a parameter, the function can return mocked data for a specific case. This
 * pattern allows frontend developers to use your API before you finished implementing it!
 *
 * In addition, using Zod schemas to parse the response will make the input/output well-typed, making the code cleaner.
 */
export const createFile = async (
  request: IRequest,
  mock?: FileResponseCode
) => {
  if (mock === "SUCCESS") {
    return FileResponse.parse(MOCK_SUCCESS);
  } else if (mock === "INVALID_FILE") {
    return FileResponse.parse(MOCK_INVALID_FILE);
  } else if (mock === "UNKNOWN") {
    return FileResponse.parse(MOCK_UNKNOWN);
  }

  const { body, ...options } = request;

  const response = await fetch("/api/file", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });

  const json = await response.json();

  return FileResponse.parse(json);
};
