import type { NextPage } from "next";
import Head from "next/head";
import { EmailSignupBox } from "@components/emailSignup";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center p-4">
        <div> 
            <div> {/*left*/}
                <h1 className="text-5xl font-extrabold leading-normal text-dark-plum md:text-[5rem] my-4 border-2 border-red-500">
                Everyone has a story worth preserving
                </h1>
                <p className="text-2xl text-gray-700 my-4">Legacy Project documents the stories of the elder generation
to ensure that their legacies are preserved for years to come.</p>
                <EmailSignupBox />
            </div>
           <div> {/*right*/}

           </div>
            
        </div>
      
      </main>
    </>
  );
};
Home.displayName = "public"

export default Home;
