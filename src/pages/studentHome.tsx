import type { NextPage } from "next";
import Head from "next/head";
import PhotoHeader from "@components/photoHeader";

import ProfileTile from "@components/profileTile";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="bg-off-white">
        <PhotoHeader/>
        <div className="lg:px-9 md:px-5 px-3">
          <h1 className="font-semibold text-xl">My Senior</h1>
          <div className="border-2 border-teal-500 my-2"></div>
        </div>
        <br></br>
        <ProfileTile name="Andrew Bojangles" location="Boston, MA" picture=""/>

      </div>
      
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;