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

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-items-center p-4">
        <div className="mx-5 flex flex-row items-center justify-items-center gap-5">
          {" "}
          {/*holds left and right*/}
          <div className="">
            {" "}
            {/*left: email signup*/}
            <h1 className="my-4 font-serif text-5xl font-bold leading-tight text-dark-plum duration-500 md:text-[4rem]">
              Everyone has a story worth preserving
            </h1>
            <p className="my-4 text-xl leading-[32px] text-[#515151] duration-500">
              Legacy Project documents the stories of the elder generation to
              ensure that their legacies are preserved for years to come.
            </p>
            <EmailSignupBox />
          </div>
          <div className="relative hidden h-[600px] w-[600px] shrink-0 items-center justify-center lg:flex">
            {" "}
            {/*right: photo*/}
            <div className="overflow-hidden rounded-full">
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
