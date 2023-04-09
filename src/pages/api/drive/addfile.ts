import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';
import { google } from 'googleapis';

async function uploadToFolder(folderId: string, fileName: string) {
        // TODO: figure out auth stuff
        const auth
        const service = google.drive({version: 'v3', auth});
      
        // TODO(developer): set folder Id
        // folderId = '1lWo8HghUBd-3mN4s98ArNFMdqmhqCXH7';
        const fileMetadata = {
          name: [fileName],
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
          throw err;
        }
}

const addFile = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });

    const fileName = req.body.filename;
    await uploadToFolder("1MVyWBeKCd1erNe9gkwBf7yz3wGa40g9a", fileName);

    res.status(200).json({
        message: "this is placeholder response",
        token
    });
}

export default addFile;
