import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { prisma } from "@server/db/client";
// import { google } from 'googleapis';
// import { getServerAuthSession } from "@server/common/get-server-auth-session";
import drive from "../drive/drive";

const uploadToFolder = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await drive(req, res);

  const fileSchema = z.object({
    folder: z.string(),
    fileName: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    fileType: z.string(),
    seniorId: z.string(),
  });
  const fileData = fileSchema.parse(JSON.parse(req.body));

  // const parentID = "1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a";
  const parentID = fileData.folder.split("/").pop();
  const fileMetadata = {
    name: [fileData.fileName],
    mimeType: "application/vnd.google-apps.document",
    parents: [parentID],
  };

  const fileCreateData = {
    resource: fileMetadata,
    fields: "id",
  };
  // const media = {
  //   mimeType: "text/plain",
  //   body: fileData.description,
  // };

  try {
    const file = await (service as NonNullable<typeof service>).files.create(
      fileCreateData
    );
    // TODO: FIX ANY TYPE
    const googleFileId = (file as any).data.id;

    // const fileEntry = await prisma?.file.create({
    //   data: {
    //     name: fileData.fileName,
    //     description: fileData.description,
    //     filetype: fileData.fileType,
    //     lastModified: new Date(),
    //     url: `https://docs.google.com/document/d/${googleFileId}`,
    //     seniorId: fileData.seniorId,
    //     Tags: fileData.tags,
    //   },
    // });

    res.status(200).json("");
    return;
  } catch (err) {
    // TODO(developer) - Handle error
    res.status(401).json({
      error: err,
    });
    throw err;
  }
};

export default uploadToFolder;
