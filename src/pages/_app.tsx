import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Navbar from "@components/Navbar";
import Sidebar from "@components/Sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  if (Component.displayName == "public") {
    return (
      <SessionProvider session={session}>
        <div className="flex flex-col h-full w-full items-center bg-tan">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <div className="flex w-full h-full bg-tan sm:flex-col md:flex-row">
          <span className="sm:inline md:hidden">
            <Navbar />
          </span>
          <span className="sm:hidden md:inline">
            <Sidebar />
          </span>
          <div className="w-full h-full"> <Component {...pageProps} /> </div>
        </div>
      </SessionProvider>
    );
  }
};

export default MyApp;
