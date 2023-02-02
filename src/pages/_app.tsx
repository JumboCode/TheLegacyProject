import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Sidebar from "@components/sidebar";
import Navbar from "@components/navbar/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  if (/* is it the Landing Page? */) {
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
