"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface ISessionProvider {
  children: React.ReactNode;
  session: React.ComponentProps<typeof NextAuthSessionProvider>["session"];
}

const SessionProvider = (props: ISessionProvider) => {
  return (
    <NextAuthSessionProvider session={props.session}>
      {props.children}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
