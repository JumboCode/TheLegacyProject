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
            <div className=" border-2 border-blue-500"> {/*left: email signup*/}
                <h1 className="text-5xl font-extrabold leading-tight text-dark-plum md:text-[4rem] my-4 border-2 border-red-500">
                Everyone has a story worth preserving
                </h1>
                <p className="text-2xl text-gray-700 bg-off-white my-4">Legacy Project documents the stories of the elder generation
to ensure that their legacies are preserved for years to come.</p>
                <EmailSignupBox />
            </div>
            <div className="w-[600px] hidden lg:flex shrink-0 items-center justify-center border-2 border-blue-500 h-[600px] relative"> {/*right: photo*/}
                <div className="h-[500px] border-2 border-green-200">
                  <Image src="/home/homepage-circle.png" alt="A circular photo of younger woman helping a senior citizen" height={500} width={500} className="absolute z-10"></Image>
                </div>
                <div className="absolute top-0 -left-24">
                  <Image src="/home/pinkflower.png" height={323} width={323} className="absolute z-0"></Image>
                </div>
                <div className="absolute -bottom-10 -right-6 z-20">
                  <Image src="/../public/home/yellowflower.png" height="246" width="246"></Image>
                </div>
                <div className="absolute -top-20 -right-8">  
                  <Image src="/../public/home/paper.png" height="368" width="274"></Image>
                </div>
            </div>
            
        </div>
      
      </main>
    </>
  );
};
Home.displayName = "public"

export default Home;
