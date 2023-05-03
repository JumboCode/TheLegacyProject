// Photo Header for Student Home Page

import React from "react";
import Image from "next/image";

export interface IPhotoHeaderProps {
  name: string | null;
  image: string | null;
  email: string | null;
}

const AdminPhotoHeader = ({ name, image, email }: IPhotoHeaderProps) => {
  return (
    <>
      <div className="mb-10">
        <div className="relative ">
          <Image
            className=" object-cover"
            src={"/student_home/header1.jpg"}
            alt={
              "Photo of flowers on an old book with a faded photo of two people"
            }
            width={2000}
            height={250}
          />
          <div className="absolute right-0 -bottom-10 flex w-[100%] items-center bg-white bg-opacity-90 p-3 pl-9 backdrop-blur-sm">
            <Image
              className="rounded-xl"
              src={image ?? "/student_home/profile_photo_pic.jpeg"}
              alt={"Profile Photo"}
              width={58.5}
              height={58.5}
            />
            <div className="flex flex-col pl-3 text-neutral-600">
              <h5 className="text-base font-bold">{name ?? "Admin"}</h5>
              <p className="text-sm font-light text-neutral-400">
                {email ?? "email@legacy.org"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPhotoHeader;
