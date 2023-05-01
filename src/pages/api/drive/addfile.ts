import { NextApiRequest, NextApiResponse } from "next";
// import { google } from 'googleapis';
// import { getServerAuthSession } from "@server/common/get-server-auth-session";
import drive from "../drive/drive";

const uploadToFolder = async (req: NextApiRequest, res: NextApiResponse) => {
  const service = await drive(req, res);

  const fileData = JSON.parse(req.body);
  // const parentID = "1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a";
  const parentID = fileData.folder.split("/").pop();
  const fileMetadata = {
    name: [fileData.fileName],
    mimeType: "application/vnd.google-apps.document",
    parents: [parentID],
  };
  const media = {
    mimeType: "text/plain",
    body: fileData.description,
  };

  try {
    const file = await (service as NonNullable<typeof service>).files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    res.status(200).json({
      message: "Successfully created document",
      folder: parentID,
      fileId: file.data.id,
      file: fileData.fileName,
      description: fileData.description,
      tags: fileData.tags,
    });
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
