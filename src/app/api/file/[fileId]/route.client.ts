import { z } from "zod";
import { File, FileResponse } from "./route.schema";

/**
 * Describe the interface of SignInRequest.
 */
type IFile = z.infer<typeof File>;

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IRequest extends Omit<RequestInit, "body"> {
  fileId: string;
  body: IFile;
}

export const updateFile = async (request: IRequest) => {
  const { fileId, body, ...options } = request;

  const response = await fetch(`/api/file/${fileId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });

  const json = await response.json();

  return FileResponse.parse(json);
};

export const deleteFile = async (request: IRequest) => {
  const { fileId, body, ...options } = request;

  const response = await fetch(`/api/file/${fileId}`, {
    method: "DELETE",
    body: JSON.stringify(body),
    ...options,
  });

  const json = await response.json();

  return FileResponse.parse(json);
};
