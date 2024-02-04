"use client";

import {
  deleteSenior,
  patchSenior,
  postSenior,
} from "src/app/api/senior/[id]/route.client";
import { IPostSeniorRequestSchema } from "@api/senior/[id]/route.schema";

function Test() {
  async function Poo() {
    postSenior({
      userId: "6587829665af0d81089c42fb",
      body: {
        name: "Stephen",
        location: "Boston",
        description: "He is cool",
        StudentIDs: ["6587829665af0d81089c42fb"],
        ChapterID: "65878595b94284e0c3e02d55",
      },
    }).then((res) => {
      console.log(res);
    });
  }

  return <button onClick={Poo}>Add senior</button>;
}

export default Test;
