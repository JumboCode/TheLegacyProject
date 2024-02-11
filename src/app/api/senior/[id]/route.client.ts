import {
  seniorDeleteResponse,
  seniorPatchResponse,
  IPatchSeniorRequestSchema,
} from "./route.schema";

interface IDeleteSeniorRequest extends Omit<RequestInit, "body"> {
  seniorId: string;
}

interface IPatchSeniorRequest extends Omit<RequestInit, "body"> {
  seniorId: string;
  body: IPatchSeniorRequestSchema;
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
