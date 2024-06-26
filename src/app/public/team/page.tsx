"use client";

import Link from "next/link";
import Image from "next/legacy/image";
import OUR_TEAM from "@public/landing/team/our_team.png";
import MEET_TLP_1 from "@public/landing/team/meet_tlp1.png";
import MEET_TLP_2 from "@public/landing/team/meet_tlp2.png";
import MEET_TLP_3 from "@public/landing/team/meet_tlp3.png";
import PRESS_1 from "@public/landing/team/press1.png";
import PRESS_2 from "@public/landing/team/press2.png";
import PhotoCarousel from "@components/PhotoCarousel";
import { useEffect, useState } from "react";

const PublicLayout = () => {
  const press1 =
    "https://www.tuftsdaily.com/article/2022/02/tufts-legacy-project-builds-intergenerational-connections-one-story-at-a-time";
  const press2 =
    "https://generations.asaging.org/accurate-legacies-left-intergenerational-work";
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkWindowSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkWindowSize();
    window.addEventListener("resize", checkWindowSize);
    return () => {
      window.removeEventListener("resize", checkWindowSize);
    };
  }, []);
  return (
    <div className="flex w-full flex-col py-6">
      <span className="pt-6 text-center text-4xl font-semibold sm:text-left">
        Meet TLP
      </span>
      <p className="mb-4 mt-7 leading-7">
        The Legacy Project, Inc. (TLP) connects college students with local
        elders in their community with the purpose of building strong
        intergenerational relationships and documenting the life histories of
        seniors, ensuring that their legacies are preserved for years to come.
        Join an ever-growing network of college students across the country
        passionate about telling stories, and form a Legacy Project chapter at
        your school today.
      </p>
      {isSmallScreen ? (
        <PhotoCarousel
          imagePaths={[
            "/landing/team/meet_tlp1.png",
            "/landing/team/meet_tlp2.png",
            "/landing/team/meet_tlp3.png",
          ]}
        />
      ) : (
        <div className="mt-6 flex sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
          <Image src={MEET_TLP_1} alt="meet_tlp_1" className="flex" />
          <Image src={MEET_TLP_2} alt="meet_tlp_2" className="flex" />
          <Image src={MEET_TLP_3} alt="meet_tlp_3" className="flex" />
        </div>
      )}
      <span className="mb-6 mt-8 pt-6 text-center text-3xl font-semibold sm:text-left">
        Our Team
      </span>
      <Image src={OUR_TEAM} alt="our_team" />
      <span className="mt-8 pt-6 text-center text-3xl font-semibold sm:text-left">
        Press
      </span>
      {isSmallScreen ? (
        <div className="flex flex-col py-6">
          <div className="flex flex-col items-center">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="mt-3 text-center hover:underline"
              href={press1}
            >
              <Image src={PRESS_1} alt="press_1" />
              Tufts Legacy Project builds intergenerational connections, one
              story at a time
            </Link>
          </div>
          <div className="flex flex-col items-center pt-6">
            <Link
              className="mb-8 mt-3 text-center hover:underline"
              href={press2}
            >
              <Image src={PRESS_2} alt="press_2" className="mt-6" />
              Intergenerational Connection Key to Leaving Accurate Legacies
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 grid-rows-4 gap-4 text-center">
          <div className="row-span-3">
            <Link rel="noopener noreferrer" target="_blank" href={press1}>
              <Image src={PRESS_1} alt="press_1" />
            </Link>
          </div>
          <div className="row-span-3">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              className="hover:underline"
              href={press2}
            >
              <Image src={PRESS_2} alt="press_2" />
            </Link>
          </div>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="truncate hover:underline"
            href={press1}
          >
            Tufts Legacy Project builds intergenerational connections, one story
            at a time
          </Link>
          <Link
            rel="noopener noreferrer"
            target="_blank"
            className="truncate hover:underline"
            href={press2}
          >
            Intergenerational Connection Key to Leaving Accurate Legacies
          </Link>
        </div>
      )}
    </div>
  );
};
export default PublicLayout;
