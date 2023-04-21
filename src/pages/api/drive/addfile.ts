import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';
import { GoogleAuth } from "google-auth-library";
import { getSession } from "next-auth/react";
import { getServerAuthSession } from "@server/common/get-server-auth-session";

async function uploadToFolder(folderId: string, fileName: string) {
        const session = await getServerAuthSession({})
      
        // const {google} = require('googleapis');
        const {access_token} = await prisma.account.findFirst({
          where: {
            userId: user.id,
          },
        }) ?? null;
        
        // TODO: figure out auth stuff
        const auth = new google.auth.OAuth2({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
        auth.setCredentials({

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
    console.log("resresh_token", refresh_token)
    
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
    const calendar = google.calendar({
      auth,
      version: "v3"
    });

    const event = await calendar.calendarList.get({
      calendarId: "primary"
    });

    console.log("event", event);

    const fileName = "filename";
    // const fileName = req.body.filename;
    // await uploadToFolder("1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a", fileName);

    res.status(200).json({
        message: "this is placeholder response",
        token
    });
}

export default addFile;
