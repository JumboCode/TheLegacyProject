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
      
      <div>
        <PhotoHeader/>
        
        <ProfileTile name="J Doe" location="Boston, MA" picture=""/>

      </div>
      
    </>
  );
};

// Render sidebar instead of top navbar
Home.displayName = "private";

export default Home;