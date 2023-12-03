import { z } from "zod";
import { Email, EmailResponse } from "./route.schema";

/**
 * Describe the interface of SignInRequest.
 */
type IEmail = z.infer<typeof Email>;

type IEmailResponse = z.infer<typeof EmailResponse>;

/**
 * Extract all the values of "code".
 */
type EmailResponseCode = z.infer<typeof EmailResponse>["code"];

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  body: IEmail;
}

const MOCK_SUCCESS: IEmailResponse = {
  code: "SUCCESS",
  message: "Email successfully submitted",
};

const MOCK_DUPLICATE_EMAIL: IEmailResponse = {
  code: "DUPLICATE_EMAIL",
  message: "This email already exists",
};

const MOCK_INVALID_EMAIL: IEmailResponse = {
  code: "INVALID_EMAIL",
  message: "Invalid email submission",
};

/**
 * If "mock" is given as a parameter, the function can return mocked data for a specific case. This
 * pattern allows frontend developers to use your API before you finished implementing it!
 *
 * In addition, using Zod schemas to parse the response will make the input/output well-typed, making the code cleaner.
 */
export const createEmailRequest = async (
  request: IRequest,
  mock?: EmailResponseCode
) => {
  if (mock === "SUCCESS") {
    return EmailResponse.parse(MOCK_SUCCESS);
  } else if (mock === "INVALID_EMAIL") {
    return EmailResponse.parse(MOCK_INVALID_EMAIL);
  } else if (mock === "DUPLICATE_EMAIL") {
    return EmailResponse.parse(MOCK_DUPLICATE_EMAIL);
  }
  const { body, ...options } = request;
  const response = await fetch("/api/emails", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();

  return EmailResponse.parse(json);
};
