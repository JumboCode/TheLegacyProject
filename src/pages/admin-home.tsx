import type { NextPage } from "next";
import Head from "next/head";
import AdminPhotoHeader from "@components/adminPhotoHeader";
import HorizontalMenu from "@components/horizontalMenu/horizontalMenu";

import { SeniorGrid } from "@components/profileTile";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div className="h-max bg-taupe">
        <AdminPhotoHeader />
        <hr />
        <HorizontalMenu/>
        <hr />
        <SeniorGrid name="Andrew" location="Boston" picture="" />
      </div>
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;
