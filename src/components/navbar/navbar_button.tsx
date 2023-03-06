import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image"

type NavbarButtonProps = {
  icon: JSX.Element;
  isCurr: boolean;
  label: string;
  to: string;
}

const NavbarButton = ({
    icon,
    isCurr,
    label,
    to,
  }: NavbarButtonProps) => {
  
    return (
      <>
        { isCurr ?
          // default selected
          <Link href={to}>
          <button className="flex flex-row inline-block text-center px-8 py-3 my-1 bg-teal text-white bg-white-500 hover:bg-teal hover:text-white active:bg-teal-900 active:text-white text-sm font-sans text-semibold rounded-md" >
            {/* <Image src={icon} alt="icon" width={20} height={20}/> */}
            {icon}
            {label}
          </button>
          </Link>
        :
          // unselected
          <Link href={to}>
          <button className="flex flex-row inline-block text-center px-8 py-3 my-1 bg-taupe-hover hover:text-white active:bg-teal-900 active:text-white text-sm font-sans text-semibold rounded-md" >
            {/* <Image src={icon} alt="icon" width={20} height={20}/> */}
            {icon}
            {label}
          </button>
          </Link>
        }
      </>
    );
  };

export default NavbarButton;
