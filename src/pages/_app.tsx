import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@components/navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  if (true) {
    return (
        <SessionProvider session={session}>
            <div className="flex flex-col w-screen h-screen">
                <Navbar />
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    );
  }
  else {
    return (
        <SessionProvider session={session}>
            <div className="flex flex-row w-screen h-screen">
                <Sidebar />
                <Component {...pageProps} />
            </div>
        </SessionProvider>
    );
  }
};

export default MyApp;