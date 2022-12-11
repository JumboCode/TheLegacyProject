import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from "next/image"

type navbarItem = {
  icon: string;
  isCurr: boolean;
  label: string;
  to: string;
}

const NavbarButton = ({
    icon,
    isCurr,
    label,
    to,
  }: navbarItem) => {
    /*
    const handleClick = () => {
        
    };
    */
  
    return (
      <>
        { isCurr ?
          // default selected
          <Link href={to}>
          <button className="inline-block flex-center align-middle px-5 py-3 mx-8 bg-green text-white bg-white-500 hover:bg-green hover:text-white active:bg-green-900 active:text-white font-medium font-sans text-base rounded-lg" >
            <Image src={icon} alt="icon" width={20} height={20}/>
              {label}
          </button>
          </Link>
        :
          // unselected
          <Link href={to}>
          <button className="inline-block flex-center align-middle px-5 py-3 mx-8 hover:bg-green hover:text-white active:bg-green-900 active:text-white font-medium font-sans text-base rounded-lg" >
            <Image src={icon} alt="icon" width={20} height={20}/>
              {label}
          </button>
          </Link>
        }
      </>
    );
  };

export default NavbarButton;
