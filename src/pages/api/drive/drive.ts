import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { google } from "googleapis";

const drive = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    res.status(401).json({
      error: "not signed in",
    });
    return;
  }

  const { access_token, refresh_token } = (await prisma.account.findFirst({
    where: {
      userId: session.user.id,
    },
  })) ?? { access_token: null };

  console.log("accesss_token", access_token);
  console.log("resresh_token", refresh_token);

  if (!access_token || !refresh_token) {
    res.status(500).json({
      error: "missing access token",
    });
    return;
  }

  const auth = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  });
  auth.setCredentials({
    access_token,
    refresh_token,
  });

  const service = google.drive({
    version: "v3",
    auth,
  });

  // res.status(200).json({
  //   message: "Successfully authenticated",
  // });

  return service;
};
export default drive;
