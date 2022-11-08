import React, { useState } from 'react';
import Link from 'next/link';
import { NavbarMenu, NavbarItem } from './index';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  
  const toggleNavMenu = () => {
    setToggleMenu(!toggleMenu);
  }
 
  return (
    <>
      <nav className='flex flex-col sticky top-0 z-50 shadow-2xl overflow-hidden bg-white'>

        {/* navbar */}
        <div className='justify-center h-20 flex justify-between items-center m-auto w-11/12'>

          {/* logo */}
          <div className='flex'>
            <div className='mr-6 text-2xl font-bold text-gray-700 py-1.5 leading-normal'>
              <Link href='/'>The Legacy Project</Link>
            </div>
          </div>

          {/* desktop */}
          <div className='hidden lg:flex'>
            <NavbarItem inMenu={false} label='About' to='/about' />
            <NavbarItem inMenu={false} label='Contact Us' to='/contact' />
            {/* <NavbarItem inMenu={false} label='Test 1' to='#' />
            <NavbarItem inMenu={false} label='Test 2' to='#' />
            <NavbarItem inMenu={false} label='Test 3' to='#' /> */}
            <button className='bg-gray-700 text-l text-white font-semibold py-1.5 px-4 rounded-full hover:-translate-y-0.5 duration-150'>
              <a target="_blank" href="https://google.com/" rel="noopener noreferrer">
                Log in with Google
              </a>
            </button>
          </div>

          {/* mobile */}
          <div className='flex lg:hidden hover:cursor-pointer'>
            { toggleMenu ? 
              // close icon
              <div className="" onClick={toggleNavMenu}>
                <svg className="h-7 w-7 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="5" x2="5" y2="18" />
                  <line x1="5" y1="5" x2="18" y2="18" />
                </svg>
              </div>
              :    
              // hamburger icon
              <div className="space-y-1" onClick={toggleNavMenu}>
                <span className="block h-1 w-7 bg-gray-700 rounded"></span>
                <span className="block h-1 w-7 bg-gray-700 rounded"></span>
                <span className="block h-1 w-7 bg-gray-700 rounded"></span>
              </div> 
            }
          </div>

        </div>

        {/* dropdown */}
        <NavbarMenu isActive={toggleMenu}/>
      </nav>
    </>
  )
}

export default Navbar;
