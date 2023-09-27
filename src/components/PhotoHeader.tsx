// Photo Header for Student Home Page

import React from "react";
import Image from "next/legacy/image";
import cn from "classnames";

export interface IPhotoHeaderProps {
  admin: boolean;
  name: string | null;
}

const PhotoHeader = ({ admin, name }: IPhotoHeaderProps) => {
  return (
    <>
        <div className={cn("relative flex flex-col w-auto border border-darker-tan", 
                          admin ? "xs:h-[140px] md:h-[160px]" : "xs:h-[180px] md:h-[200px]")}>
          <div className="relative flex h-full w-full">
            <Image
              className="object-cover"
              src={"/profile/header3.jpg"}
              alt={"A black typewriter on a wooden desk with a notebook and old photos next to it."}
              layout="fill"
            />
          </div>
          
          <div className={"absolute flex right-0 bottom-0 w-full h-[40px] p-2 items-center \
                           bg-off-white bg-opacity-70 backdrop-blur-sm"}>
            <span className="xs:pl-2 sm:pl-4 text-md font-serif tracking-normal text-dark-plum">
                  Hello{name == null ? " there" : ", " + name.split(' ').shift()}.
            </span>
          </div>
        </div>
    </>
  );
};

export default PhotoHeader;