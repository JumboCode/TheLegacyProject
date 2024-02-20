import { z } from "zod";
import { FileResponse } from "./route.schema";
import { File } from "@server/model";

/**
 * Describe the interface of SignInRequest.
 */
type IFile = z.infer<typeof File>;

/**
 * Extends the parameters of fetch() function to give types to the RequestBody.
 */
interface IUpdateRequest extends Omit<RequestInit, "body"> {
  fileId: string;
  body: IFile;
}

interface IDeleteRequest extends Omit<RequestInit, "body"> {
  fileId: string;
}

export const updateFile = async (request: IUpdateRequest) => {
  const { fileId, body, ...options } = request;

  const response = await fetch(`/api/file/${fileId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });

  const json = await response.json();

  return FileResponse.parse(json);
};

export const deleteFile = async (request: IDeleteRequest) => {
  const { fileId, ...options } = request;

  const response = await fetch(`/api/file/${fileId}`, {
    method: "DELETE",
    ...options,
  });

  const json = await response.json();

  return FileResponse.parse(json);
};
