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
        <div className="relative flex flex-col sm:h-[140px] md:h-[160px] w-auto">
          <div className="relative flex h-full w-full">
            <Image
              className="object-cover rounded-md"
              src={"/student_home/header3.jpg"}
              alt={"A black typewriter on a wooden desk with a notebook and old photos next to it."}
              layout="fill"
            />
          </div>
          
          <div className="absolute flex right-0 bottom-0 w-[100%] h-[35%] items-center bg-off-white bg-opacity-70 backdrop-blur-sm rounded-md \
                          p-2">
            <div className="flex flex-col pl-4">
              <p className="sm:text-xl md:text-2xl font-serif leading-normal text-dark-plum">
                Hello{name == null ? " there" : ", " + name.split(' ').shift()}.
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default PhotoHeader;