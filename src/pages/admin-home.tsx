import type { NextPage } from "next";
import Head from "next/head";
import AdminPhotoHeader from "@components/adminPhotoHeader";
import HorizontalMenu from "@components/horizontalMenu/horizontalMenu";

import AdminGrid from "@components/profileTile/adminGrid";

const Home: NextPage = () => {
  
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-max bg-taupe">
        <AdminPhotoHeader />
        {/* TODO: this horizontal bar is not responsive :( */}
        <div className = "resize-y">
          <div className = "pl-9" >
            <hr/>
          </div>
          <HorizontalMenu/>
          <div className = "pl-9 shadow-sm" >
            <hr/>
          </div>
        </div>
        <AdminGrid name="Andrew" location="Boston" picture="" />
      </div>
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;