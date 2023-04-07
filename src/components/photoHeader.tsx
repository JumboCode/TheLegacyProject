// Photo Header for Student Home Page

import React from "react";
import Image from "next/image";

const PhotoHeader = () => {
  return (
    <>
      <div className="pb-9">
        <div className="relative m-4 md:m-5 lg:m-9">
          <Image
            className="rounded-2xl object-cover"
            src={"/student_home/header1.jpg"}
            alt={
              "Photo of flowers on an old book with a faded photo of two people"
            }
            width={2000}
            height={500}
          />
          <div className="absolute right-0 -bottom-12 flex h-20 w-[98%] items-center rounded-2xl bg-white bg-opacity-90 p-3 backdrop-blur-sm md:-bottom-10">
            <Image
              className="rounded-xl"
              src={"/student_home/profile_photo_pic.jpeg"}
              alt={"Profile Photo"}
              width={58.5}
              height={58.5}
            />
            <div className="flex flex-col pl-3 text-neutral-600">
              <h5 className="text-base font-bold">Angela Han</h5>
              <p className="text-sm">email@legacy.org</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhotoHeader;
