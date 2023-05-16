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
        <div className="relative flex flex-col">
          <div className="h-[150px] w-full">
            <Image
              className="object-cover"
              src={"/student_home/header3.jpg"}
              alt={ "Photo of flowers on an old book with a faded photo of two people"}
              layout="fill"
              // width={2000}
              // height={150}
            />
          </div>
          
          <div className="flex absolute right-0 bottom-0 w-[100%] h-[75px] items-center bg-white bg-opacity-80 p-3 pl-9 backdrop-blur-sm">
            <div className="h-[58.5px] w-[58.5px]">
              <Image
                className="rounded-xl"
                src={image ?? "/student_home/profile_photo_pic.jpeg"}
                alt={"Profile Photo"}
                width={58.5}
                height={58.5}
              />
            </div>
            <div className="flex flex-col pl-3 text-neutral-600">
              <h5 className="text-lg font-bold">{name ?? "Admin"}</h5>
              <p className="text-md font-light text-neutral-500">
                {email ?? "email@legacy.org"}
              </p>
            </div>
          </div>
        </div>
    </>
  );
};

export default PhotoHeader;