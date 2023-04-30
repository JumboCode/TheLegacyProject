import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "@components/navbar";
import Sidebar from "@components/sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  if (Component.displayName == "public") {
    return (
      <SessionProvider session={session}>
        <div className="flex h-full w-screen flex-col bg-taupe">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <div className="flex w-screen bg-taupe sm:flex-col md:flex-row">
          <span className="sm:inline md:hidden">
            {" "}
            <Navbar />{" "}
          </span>
          <span className="sm:hidden md:inline">
            {" "}
            <Sidebar />{" "}
          </span>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  }
};

export default MyApp;
