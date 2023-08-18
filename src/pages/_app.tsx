import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import Image from "next/image"
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
        {/* bg-paper bg-repeat bg-blend-multiply */}
        <div className="flex flex-col h-full w-full items-center bg-off-white">  
          <Navbar displayName={Component.displayName}/>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider session={session}>
        <div className="flex w-full h-full bg-tan flex-col md:flex-row">
          <span className="inline md:hidden">
            <Navbar displayName={Component.displayName ?? "private"}/>
          </span>
          <span className="w-[195px] min-w-[195px] hidden md:inline">
            <Sidebar displayName={Component.displayName ?? "private"}/>
          </span>
          <div className="w-full h-full"> <Component {...pageProps} /> </div>
        </div>
      </SessionProvider>
    );
  }
};

export default MyApp;
