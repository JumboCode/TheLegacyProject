import type { NextPage } from "next";
import Head from "next/head";
import { EmailSignupBox } from "@components/emailSignup";
import { PhotoCarousel } from "@components/photoGallery";
import LandingFooter from "@components/landingFooter";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen w-screen flex-col items-center justify-items-center p-4">
        <div className="relative px-5 py-10 flex flex-row items-center justify-items-center gap-8 duration-500">
          {" "}
          {/*holds left and right*/}
          <div className="flex flex-col gap-4 p-8 md:p-4 items-center lg:items-start justify-items-center">
            {" "}
            {/*left: email signup*/}
            <h1 className="font-serif text-5xl font-bold leading-tight  text-dark-plum duration-500 xl:text-[4rem] text-center lg:text-left z-10">
              Everyone has a story worth preserving
            </h1>
            <p className="mb-1 text-xl leading-[32px] text-[#515151] duration-500 text-center lg:text-left z-10">
              Legacy Project documents the stories of the elder generation to
              ensure that their legacies are preserved for years to come.
            </p>
            <div className="z-10 w-3/4 lg:w-full xl:w-[7/8]">
              <EmailSignupBox />
            </div>
              <div className="absolute lg:hidden top-10 -left-4">
                <Image
                  src="/home/pinkflower.png"
                  height={160}
                  width={160}
                  alt="Image of a branch with small dried pink flowers with a transparent background"
                  className="absolute z-0 duration-500"
                ></Image>
              </div>
              <div className="absolute -bottom-2 right-0 z-0">
                <Image
                  src="/home/yellowflower.png"
                  height={146}
                  width={146}
                  alt="Image of a single yellow-orange dried flower with a transparent background"
                  className="duration-500"
              ></Image>
              </div>
              <div className="absolute -top-8 -right-4">
                <Image
                  src="/home/paper.png"
                  height={184}
                  width={137}
                  alt="Image of an aged piece of paper with cursive writing on it"
                  className="duration-500"
                ></Image>
              </div>
          </div>
          
          <div className="relative hidden h-[600px] w-[600px] shrink-0 items-center justify-center lg:flex duration-500">
            {" "}
            {/*right: photo*/}
            <div className="overflow-hidden rounded-full duration-500">
              <Image
                src="/home/homepage-circlehq.jpeg"
                alt="A circular photo of younger woman helping a senior citizen"
                height={450}
                width={450}
                objectFit="cover"
                className="absolute z-10 duration-500"
              ></Image>
            </div>
            <div className="absolute top-0 -left-24">
              <Image
                src="/home/pinkflower.png"
                height={323}
                width={323}
                alt="Image of a branch with small dried pink flowers with a transparent background"
                className="absolute z-0 duration-500"
              ></Image>
            </div>
            <div className="absolute -bottom-10 -right-6 z-20">
              <Image
                src="/home/yellowflower.png"
                height={246}
                width={246}
                alt="Image of a single yellow-orange dried flower with a transparent background"
                className="duration-500"
              ></Image>
            </div>
            <div className="absolute -top-20 -right-8">
              <Image
                src="/home/paper.png"
                height={368}
                width={274}
                alt="Image of an aged piece of paper with cursive writing on it"
                className="duration-500"
              ></Image>
            </div>
          </div>
        </div>
        <div className="w-screen">
          <PhotoCarousel show={4} />
        </div>
        <LandingFooter />
      </main>
    </>
  );
};
Home.displayName = "public";

export default Home;
