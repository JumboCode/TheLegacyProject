import React from 'react';
import Link from 'next/link';

type navbarItem = {
  inMenu: boolean;
  label: string;
  to: string;
}

const NavbarItem = ({
  inMenu,
  label,
  to,
}: navbarItem) => {
  return (
    <>
      { inMenu ?
          // mobile
          <div className='text-xl font-semibold text-gray-700 py-2 leading-normal hover:-translate-y-0.5 duration-150'>
            <Link href={to}>{label}</Link>
          </div>
        :
          // desktop
          <div className='mr-5 text-l font-semibold text-gray-700 py-2 leading-normal hover:-translate-y-0.5 duration-150'>
            <Link href={to}>{label}</Link>
          </div>
      }
    </>
  )
}

export default NavbarItem;
