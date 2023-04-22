import { NextApiRequest, NextApiResponse } from "next";
import { google } from 'googleapis';
import { getServerAuthSession } from "@server/common/get-server-auth-session";

const uploadToFolder = async (req: NextApiRequest, res: NextApiResponse) => {
  // const token = await getToken({ req, secret });
  const session = await getServerAuthSession({req, res});

  if (!session || !session.user) {
    res.status(401).json({
      error: "not signed in"
    })
    return;
  }

  const {access_token, refresh_token} = await prisma.account.findFirst({
    where: {
      userId: session.user.id,
    },
  }) ?? {access_token: null};

  console.log("accesss_token",access_token);
  console.log("resresh_token", refresh_token);

  if (!access_token || !refresh_token) {
    res.status(500).json({
      error: "missing access token"
    })
    return;
  }

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  });
  auth.setCredentials({
    access_token, refresh_token
  });
  const service = google.drive({
    version: "v3",
    auth
  });

  const fileData = JSON.parse(req.body);
  // console.log("fileData", fileData);
  // const fileName = fileData.fileName;
  // console.log("fileName", fileName);
  const parentID = '1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a';
  const fileMetadata = {
    name: fileData.fileName,
    parents: [parentID],
  };
  const media = {
    // application/vnd.google-apps.document doesn't work 
    // b/c it is not specificed what the body field should contain? 
    // maybe you need to create a document using the docs api?
    // keeping it as text/plain with a string for now
    // body not being empty throws a 401 invalid credentials error? 
    // might need to redo permissions in the scopes
    mimeType: 'text/plain',
    body: ""
  };

  try {
    const file = await service.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log('File Id:', file.data.id);
    // return file.data.id;
    res.status(200).json({
      message: "Successfully created document",
      folder: parentID,
      fileID: file.data.id,
      file: fileData.fileName,
    })
  } catch (err) {
    // TODO(developer) - Handle error
    res.status(401).json({
      error: err
    })
    throw err;
  }
}

export default uploadToFolder;


