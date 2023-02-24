import type { NextPage } from "next";
import Head from "next/head";
import { EmailSignupBox } from "@components/emailSignup";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
        <main className="container mx-auto flex min-h-screen bg-off-white flex-col items-center justify-items-center p-4">
          <div className="flex flex-row gap-5 items-center justify-items-center border-2 border-green-500"> {/*holds left and right*/}
            <div className="w-1/2 border-2 border-blue-500"> {/*left: email signup*/}
                <h1 className="text-5xl font-extrabold leading-tight text-dark-plum md:text-[4rem] my-4 border-2 border-red-500">
                Everyone has a story worth preserving
                </h1>
                <p className="text-2xl text-gray-700 bg-off-white my-4">Legacy Project documents the stories of the elder generation
to ensure that their legacies are preserved for years to come.</p>
                <EmailSignupBox />
            </div>
            <div className="w-1/2 flex flex-col items-center justify-items-center border-2 border-blue-500"> {/*right: photo*/}
                <Image src="/../public/home/homepage-circle.png" alt="A circular photo of younger woman helping a senior citizen" height="500px" width="500px"></Image>
            </div>
            
        </div>
      
      </main>
    </>
  );
};
Home.displayName = "public"

export default Home;
