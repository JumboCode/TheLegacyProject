"use client";

import Head from "next/head";

import PhotoCarousel from "@components/PhotoCarousel";
import LandingFooter from "@components/LandingFooter";
import FlowerBox from "@components/FlowerBox";

import Button from "@components/Button";
import Image from "next/legacy/image";

const HomePage = () => {
  // TODO: make env variables
  const chapterInitForm = "https://forms.gle/gBdmpsW6JFnYvwRf7";
  const chapterResources =
    "https://drive.google.com/drive/folders/1vw8rc5sU0bYJkgH75VZOjI6IF-XAWEmG?usp=share_link";
  const legacyInstagram =
    "https://instagram.com/thelegacyprojectus?igshid=MzRlODBiNWFlZA==";

  return (
    <main className="flex flex-col">
      <FlowerBox>
        {/* Hero Section and Action Items Buttons */}
        <div className="flex w-full flex-row items-center md:px-[40px] lg:px-[60px]">
          <div className="flex flex-col items-center gap-[20px] lg:mr-[20px] lg:items-start">
            <h1 className="mb-[10px] text-center font-serif text-3xl font-semibold lg:text-left lg:text-4xl">
              Everyone has a story that&apos;s worth preserving.
            </h1>
            <p className="text-md text-center font-serif tracking-easy md:text-lg lg:text-left xl:text-xl">
              The Legacy Project, Inc. (TLP) connects college students with
              local elders in their community with the purpose of building
              strong intergenerational relationships and documenting the life
              histories of seniors, ensuring that their legacies are preserved
              for years to come.
            </p>

            <p className="text-md text-center font-serif tracking-easy md:text-lg lg:text-left xl:text-xl">
              Join an ever-growing network of college students across the
              country passionate about telling stories, and form a Legacy
              Project chapter at your school or university today. Fill out the
              form below and we will be in touch soon about next steps!
            </p>
          </div>

          <span className="relative hidden aspect-square h-[200px] w-[200px] grow-0 lg:flex">
            <Image
              src="/landing/legacy-logo.png"
              alt="A drawing of an older woman and a young boy enjoying ice cream cones together."
              layout="fill"
              objectFit="cover"
            />
          </span>
        </div>
        {/* Action Items Buttons */}

        <div className="flex w-full flex-row flex-wrap place-items-center justify-center gap-[20px]">
          <h3>
            <Button
              text="Start a Chapter"
              color="bg-tag-rust"
              hover="hover:bg-dark-rust"
              link="/public/start-chapter"
            />
          </h3>

          <Button
            text="TLP Chapter Resources"
            color="bg-tag-rust"
            hover="hover:bg-dark-rust"
            link={chapterResources}
          />
          <Button
            text="TLP Instagram"
            color="bg-tag-rust"
            hover="hover:bg-dark-rust"
            link={legacyInstagram}
          />
        </div>
      </FlowerBox>
      <div className="flex w-full flex-col justify-center gap-y-4 py-[20px]">
        <span className="text-center font-serif text-3xl font-semibold sm:text-left sm:text-4xl">
          About Us
        </span>
        <p className="font-serif leading-7">
          The Legacy Project, Inc. (TLP) connects college students with local
          elders in their community with the purpose of building strong
          intergenerational relationships and documenting the life histories of
          seniors, ensuring that their legacies are preserved for years to come.
          Join an ever-growing network of college students across the country
          passionate about telling stories, and form a Legacy Project chapter at
          your school today.
        </p>
        <p className="font-serif leading-7">
          The concept of The Legacy Project (TLP) began in 2018, when Arielle
          Galinsky, a high school junior at the time, spent her time working at
          a local senior community in her Massachusetts hometown. Her role
          allowed her to interact with the residents, which she greatly enjoyed,
          yet she always left her shift with a strong desire to learn more about
          the stories of the seniors she met. With this strong curiosity, paired
          with a deep sense of regret she felt having lost her own grandfathers
          at a young age, Arielle decided to spearhead TLP as a personal
          project. The initiative encompassed conducting thorough interviews of
          18 residents living in the community, with the intention to hold a
          ceremony at the finale of the project to provide her older friends
          with the opportunity to share their stories with their families. When
          the COVID-19 pandemic hit, Arielle pivoted, and decided the best way
          to preserve the 18 captivating stories of the seniors she interviewed
          was through prose.
        </p>
      </div>

      <PhotoCarousel />
      <LandingFooter />
    </main>
  );
};

HomePage.displayName = "public";

export default HomePage;
