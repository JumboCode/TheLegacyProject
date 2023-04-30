import { getServerAuthSession } from "@server/common/get-server-auth-session";
import { GetServerSidePropsContext } from "next";

export default async function getUser(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
}
