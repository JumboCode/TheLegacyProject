import { prisma } from "@server/db/client";
import { google } from "googleapis";
import { env } from "@env/server.mjs";

export const createDriveService = async (userID: string) => {
  const { access_token, refresh_token } = (await prisma.account.findFirst({
    where: {
      userId: userID,
    },
  })) ?? { access_token: null };

  const auth = new google.auth.OAuth2({
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  });

  auth.setCredentials({
    access_token,
    refresh_token,
  });

  const service = google.drive({
    version: "v3",
    auth,
  });

  return service;
};
