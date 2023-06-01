import type { NextPage } from "next";
import Head from "next/head";
import { PhotoCarousel } from "@components/photoGallery";
import LandingFooter from "@components/landingFooter";
import { EmailSignupBox } from "@components/emailSignup";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>The Legacy Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-items-center p-4">
        <div className="relative flex h-full flex-row items-center justify-items-center gap-5">
          <div className="z-10 p-10">
            {/* holds paragraph and email signup */}
            <h1
              className="my-8 text-center font-serif text-4xl font-bold leading-tight  
                           text-dark-plum
                           duration-500 sm:text-5xl
                           lg:text-left lg:text-5xl xl:text-6xl"
            >
              Everyone has a story that's worth preserving.
            </h1>
            <p className="my-8 text-center font-serif text-xl leading-tight text-[#515151] duration-500 sm:text-2xl sm:leading-[32px] lg:text-left ">
              The Legacy Project tells the stories of our older generations to
              ensure that their legacies are preserved for years to come.
            </p>
            <EmailSignupBox />
          </div>
          <div className="absolute top-10 -left-4 lg:hidden">
            <Image
              src="/home/pinkflower.png"
              height={160}
              width={160}
              alt="Image of a branch with small dried pink flowers with a transparent background"
              className="absolute z-0 duration-500"
            ></Image>
          </div>
          <div className="absolute -bottom-4 -right-4 z-0 lg:hidden">
            <Image
              src="/home/yellowflower.png"
              height={146}
              width={146}
              alt="Image of a single yellow-orange dried flower with transparent background"
              className="duration-500"
            ></Image>
          </div>
          <div className="absolute -top-8 -right-4 lg:hidden">
            <Image
              src="/home/paper.png"
              height={184}
              width={137}
              alt="Image of an aged piece of paper with cursive writing onit"
              className="duration-500"
            ></Image>
          </div>
          <div
            className="relative m-4 hidden shrink-0 duration-500 lg:flex
                          lg:h-[350px] lg:w-[350px]
                          xl:h-[500px] xl:w-[500px]"
          >
            <Image
              src="/home/accent.png"
              alt="A circular photo of a young woman working with an older woman, with dried
                     flower accents around it."
              layout="fill"
              objectFit="cover"
              className=""
            ></Image>
            {/* holds photo and dried flower accents */}
          </div>
        </div>
        <div className="w-full">
          <PhotoCarousel show={8} />
        </div>
        <LandingFooter />
      </main>
    </>
  );
};
Home.displayName = "public";

export default Home;
