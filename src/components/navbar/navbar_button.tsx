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
    /*
    const handleClick = () => {
        
    };
    */
  
    return (
      <>
        { isCurr ?
          // default selected
          <Link href={to}>
          <button className="flex flex-row inline-block flex-center align-middle px-5 py-3 my-1 w-full bg-green text-white bg-white-500 hover:bg-green hover:text-white active:bg-green-900 active:text-white font-medium font-sans text-base rounded-xl" >
            {/* <Image src={icon} alt="icon" width={20} height={20}/> */}
            {icon}
            {label}
          </button>
          </Link>
        :
          // unselected
          <Link href={to}>
          <button className="flex flex-row inline-block flex-center align-middle px-5 py-3 my-1 w-full hover:bg-green hover:text-white active:bg-green-900 active:text-white font-medium font-sans text-base rounded-xl" >
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
