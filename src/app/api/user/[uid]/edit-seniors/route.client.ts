import { TypedRequest } from "@server/type";
import { z } from "zod";
import { EditSeniorRequest, EditSeniorResponse } from "./route.schema";

export const editSeniorIDs = async (
  request: TypedRequest<z.infer<typeof EditSeniorRequest>>,
  uid: string
) => {
  const { body, ...options } = request;
  const response = await fetch(`/api/user/${uid}/edit-seniors`, {
    method: "PATCH",
    body: JSON.stringify(body),
    ...options,
  });
  return EditSeniorResponse.parse(await response.json());
};
