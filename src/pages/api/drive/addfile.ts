import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';
import { GoogleAuth } from "google-auth-library";
import { getSession } from "next-auth/react";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

async function uploadToFolder(folderId: string, fileName: string) {
      
        // const {google} = require('googleapis');
        
        // TODO: figure out auth stuff
        const auth = new GoogleAuth({
          scopes: 'https://googleapis.com/auth/drive.file'
        })
        // const auth = "AIzaSyDJCZ9gR4grPRsAUuRs23p8TpL8yGt1T5g";
        const service = google.drive({version: 'v3', auth});
      
        // TODO(developer): set folder Id
        // folderId = '1lWo8HghUBd-3mN4s98ArNFMdqmhqCXH7';
        const fileMetadata = {
          name: fileName,
          parents: [folderId],
        };
        const media = {
          mimeType: 'application/vnd.google-apps.document',
          body: "",
        };
      
        try {
          const file = await service.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
          });
          console.log('File Id:', file.data.id);
          return file.data.id;
        } catch (err) {
          // TODO(developer) - Handle error
          console.log("Error creating file in addfile.ts");
          throw err;
        }
}

const secret = process.env.NEXTAUTH_SECRET;

const addFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req, secret });
    const session = await getServerAuthSession({req, res});

    const fileName = "filename";
    // const fileName = req.body.filename;
    // await uploadToFolder("1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a", fileName);

    res.status(200).json({
        message: "this is placeholder response",
        token
    });
}

export default addFile;
