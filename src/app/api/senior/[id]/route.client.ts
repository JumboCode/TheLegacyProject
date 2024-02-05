import {
  seniorDeleteResponse,
  seniorPatchResponse,
  seniorPostResponse,
  IPatchSeniorRequestSchema,
  IPostSeniorRequestSchema,
  IDeleteSeniorRequestSchema,
} from "./route.schema";

interface IDeleteSeniorRequest extends Omit<RequestInit, "body"> {
  seniorId: string;
  body: IDeleteSeniorRequestSchema;
}

/* Note talk to nick about how to best pass the userId and the seniorId */
interface IPatchSeniorRequest extends Omit<RequestInit, "body"> {
  userId: string;
  seniorId: string;
  body: IPatchSeniorRequestSchema;
}

interface IPostSeniorRequest extends Omit<RequestInit, "body"> {
  userId: string;
  body: IPostSeniorRequestSchema;
}

export const deleteSenior = async (request: IDeleteSeniorRequest) => {
  const { seniorId, body, ...options } = request;
  const response = await fetch(`/api/senior/${seniorId}`, {
    method: "DELETE",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorDeleteResponse.parse(json);
};

export const patchSenior = async (request: IPatchSeniorRequest) => {
  const { userId, seniorId, body, ...options } = request;
  const response = await fetch(`/api/senior/${userId}/${seniorId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorPatchResponse.parse(json);
};

export const postSenior = async (request: IPostSeniorRequest) => {
  const { userId, body, ...options } = request;
  const response = await fetch(`/api/senior/${userId}`, {
    method: "POST",
    body: JSON.stringify(body),
    ...options,
  });
  const json = await response.json();
  return seniorPostResponse.parse(json);
};
