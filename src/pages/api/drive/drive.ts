import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from 'next-auth/jwt';

import { google } from 'googleapis';

const drive = async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req });

    // here we do the things to get stuff from the drive api and return it to
    // the frontend
    console.log(google.drive);

    res.status(200).json({
        message: "this is placeholder response",
        token
    });
}

export default drive;
