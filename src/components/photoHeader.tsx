// Photo Header for Student Home Page

import React from "react";
import Image from "next/image";
import cn from "classnames";

export interface IPhotoHeaderProps {
  name: string | null;
  admin: boolean;
  image: string | null;
  email: string | null;
}

const PhotoHeader = ({ name, admin, image, email }: IPhotoHeaderProps) => {
  return (
    <>
        <div className={cn("relative flex flex-col w-auto drop-shadow-md", 
                          admin ? "xs:h-[140px] md:h-[160px]" : "xs:h-[180px] md:h-[200px]")}>
          <div className="relative flex h-full w-full">
            <Image
              className="object-cover rounded"
              src={"/profile/header3.jpg"}
              alt={"A black typewriter on a wooden desk with a notebook and old photos next to it."}
              layout="fill"
            />
          </div>
          
          <div className={cn("absolute flex right-0 bottom-0 w-[100%] p-2 items-center bg-off-white bg-opacity-70 backdrop-blur-sm rounded",
                          admin ? "h-2/5" : "h-1/2")}>
          {admin ? 
            (
              <span className="xs:pl-2 sm:pl-4 text-2xl font-serif tracking-normal text-dark-plum">
                Hello{name == null ? " there" : ", " + name.split(' ').shift()}.
              </span>
            ) : 
            (
              <span className="flex flex-row w-full justify-start">
                <span className="relative ml-4 bg-indigo-200 w-[70px] h-[70px]">
                  <Image 
                    className="object-cover rounded"
                    src={image ?? "/profile/genericprofile.png"}
                    alt="The student user's profile picture."
                    layout="fill"
                  />
                </span>
                <span className="flex flex-col pl-4 gap-2 justify-center"> 
                  <p className="text-2xl font-serif text-dark-plum">{name}</p>
                  <p className="text-md text-neutral-600">{email}</p>
                </span>
              </span>
            )}
          </div>
        </div>
    </>
  );
};

export default PhotoHeader;