// Photo Header for Student Home Page

import React from "react";
import Image from "next/image";

export interface IPhotoHeaderProps {
  name: string | null;
  image: string | null;
  email: string | null;
}

const PhotoHeader = ({ name, image, email }: IPhotoHeaderProps) => {
  return (
    <>
        <div className="relative flex flex-col sm:h-[140px] md:h-[160px] w-auto m-6">
          <div className="relative flex h-full w-full">
            <Image
              className="object-cover rounded-md"
              src={"/student_home/header3.jpg"}
              alt={"A black typewriter on a wooden desk with a notebook and old photos next to it."}
              layout="fill"
            />
          </div>
          
          <div className="absolute flex right-0 bottom-0 w-[100%] h-[50%] items-center bg-off-white bg-opacity-70 backdrop-blur-sm rounded-md \
                          p-3 pl-8">
            <div className="relative flex aspect-square h-full w-auto">
              <Image
                className="rounded-sm"
                src={image ?? "/student_home/genericprofile.png"}
                alt={"Profile Photo"}
                layout="fill"
              />
            </div>
            <div className="flex flex-col pl-4 text-neutral-600">
              <h5 className="sm:text-md md:text-lg font-bold">{name ?? "Admin"}</h5>
              <p className="sm:text-sm md:text-md font-medium">
                {email ?? "email@legacy.org"}
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default PhotoHeader;