"use client";

import {
  deleteSenior,
  patchSenior,
} from "src/app/api/senior/[id]/route.client";
import { postSenior } from "@api/senior/route.client";
import { IPostSeniorRequestSchema } from "@api/senior/route.schema";

function Test() {
  async function Poo() {
    postSenior({
      // userId: "6587829665af0d81089c42fb",
      body: {
        name: "Nathan",
        location: "Nevada",
        description: "Cool beans",
        StudentIDs: ["6587829665af0d81089c42fb"],
        ChapterID: "65878595b94284e0c3e02d55",
      },
    }).then((res) => {
      console.log(res);
    });
  }

  async function Delete() {
    deleteSenior({ seniorId: "65c4263cdcb4f869ef2f2ba9" });
  }

  async function Patch() {
    patchSenior({
      seniorId: "65c4263cdcb4f869ef2f2ba9",
      body: {
        name: "Nathan",
        location: "Arkansas",
        description: "Cool beans",
        StudentIDs: ["6587829665af0d81089c42fb"],
        ChapterID: "65878595b94284e0c3e02d55",
      },
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <button onClick={Poo}>Add senior</button>
      <button onClick={Patch}>Patch this</button>
      <button onClick={Delete}>Delete senior</button>
    </div>
  );
}

export default Test;
