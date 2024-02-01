import {
  seniorDeleteResponse,
  seniorPatchResponse,
  seniorPostResponse,
  IPatchSeniorRequestSchema,
} from "./route.schema";

interface IDeleteSeniorRequest extends Omit<RequestInit, "body"> {
  seniorId: string;
}

interface IPatchSeniorRequest extends Omit<RequestInit, "body"> {
  seniorId: string;
  body: IPatchSeniorRequestSchema;
}

interface IPostSeniorRequestSchema extends Omit<RequestInit, "body"> {
  userId: string;
  body: IPostSeniorRequestSchema;
}

export const deleteSenior = async (request: IDeleteSeniorRequest) => {
  const { seniorId, ...options } = request;
  const response = await fetch(`/api/senior/${seniorId}`, {
    method: "DELETE",
    ...options,
  });
  const json = await response.json();
  return seniorDeleteResponse.parse(json);
};

export const patchSenior = async (request: IPatchSeniorRequest) => {
  const { seniorId, body, ...options } = request;
  const response = await fetch(`/api/senior/${seniorId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorPatchResponse.parse(json);
};

export const postSenior = async (request: IPostSeniorRequestSchema) => {
  const { userId, body, ...options } = request;
  const response = await fetch("/api/senior/", {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorPostResponse.parse(json);
};
