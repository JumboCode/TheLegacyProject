import { seniorDeleteResponse } from "./route.schema";

interface IDeleteSeniorRequest extends Omit<RequestInit, "body"> {
  seniorId: string;
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
