import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";


const AddStudentTile = () => {
  return (
    <Link href="/add-student">
    <div className="w-64 cursor-pointer">
        <section className="h-64 rounded bg-white p-4 drop-shadow-md">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                className="object-scale-down"
                src={"/icons/icon_profile.png"}
                alt="Placeholder profile image"
                height={80}
                width={80}
              ></Image>
            </div>
            <br></br>
            <p className="text-base font-medium text-gray-700">Add Student</p>
          </div>
        </section>
    </div>
    </Link>
  );
};

const AddTile = () => (
  <AddStudentTile/>
);

export default AddTile;