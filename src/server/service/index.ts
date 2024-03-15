import { prisma } from "@server/db/client";
import { google } from "googleapis";
import { env } from "@env/server.mjs";

export const createDriveService = async (userID: string) => {
  const account = await prisma.account.findFirst({
    where: {
      userId: userID,
    },
  });

  if (
    account === null ||
    account.access_token === null ||
    account.refresh_token === null
  ) {
    throw new Error("Invalid google drive authentication");
  }

  const { access_token, refresh_token } = account;

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
