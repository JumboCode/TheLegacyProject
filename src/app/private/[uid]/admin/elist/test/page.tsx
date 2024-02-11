"use client";
import {
  deleteSenior,
  patchSenior,
} from "src/app/api/senior/[id]/route.client";
import { postSenior } from "@api/senior/route.client";

function Test() {
  async function Post() {
    postSenior({
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
  async function Delete() {
    deleteSenior({
      seniorId: "65bfe4fe217927ba65687658",
    }).then((res) => {
      console.log(res);
    });
  }

  async function Patch() {
    patchSenior({
      seniorId: "65c4263cdcb4f869ef2f2ba9",
      body: {
        name: "Nathan",
        location: "Arkansas",
        description: "Cool beans",
        StudentIDs: ["6587829665af0d81089c42fb"],
      },
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      <button onClick={Post}>Post</button>
      <button onClick={Delete}>Delete</button>
      <button onClick={Patch}>Patch</button>
    </div>
  );
}

export default Test;
