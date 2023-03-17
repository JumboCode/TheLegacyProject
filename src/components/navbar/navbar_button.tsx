import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type NavbarButtonProps = {
  icon: JSX.Element;
  isCurr: boolean;
  label: string;
  to: string;
};

const NavbarButton = ({ icon, isCurr, label, to }: NavbarButtonProps) => {
  return (
    <>
      {isCurr ? (
        // default selected
        <Link href={to}>
          <button className="flex-center bg-white-500 hover:bg-green my-1 inline-block flex w-full flex-row rounded-xl bg-dark-green px-5 py-3 align-middle font-sans text-base font-medium text-white hover:text-white active:bg-green-900 active:text-white">
            {/* <Image src={icon} alt="icon" width={20} height={20}/> */}
            {icon}
            {label}
          </button>
        </Link>
      ) : (
        // unselected
        <Link href={to}>
          <button className="flex-center hover:bg-green my-1 inline-block flex w-full flex-row rounded-xl px-5 py-3 align-middle font-sans text-base font-medium hover:text-white active:bg-dark-green active:text-white">
            {/* <Image src={icon} alt="icon" width={20} height={20}/> */}
            {icon}
            {label}
          </button>
        </Link>
      )}
    </>
  );
};

export default NavbarButton;
