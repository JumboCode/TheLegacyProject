import React from 'react';
import { NavbarItem } from './index';

type toggleMenu = {
  isActive: boolean;
} 

const NavbarMenu = ({ isActive }: toggleMenu) => {
  return (
    <>
      {/* dropdown */}
      { isActive ? 
          <div className='lg:hidden sticky top-20 z-40 bg-white py-14 border-t-2 border-gray-200'>

            <div className='flex flex-col justify-center items-center m-auto'>
              <NavbarItem inMenu={isActive} label='About' to='/about' />
              <NavbarItem inMenu={isActive} label='Contact Us' to='/contact' />
              {/* <NavbarItem inMenu={isActive} label='Test 1' to='#' />
              <NavbarItem inMenu={isActive} label='Test 2' to='#' />
              <NavbarItem inMenu={isActive} label='Test 3' to='#' /> */}
              <button className='bg-gray-700 text-l text-white font-semibold py-3 px-4 my-4 rounded-full hover:-translate-y-0.5 duration-150'>
                <a target="_blank" href="https://google.com/" rel="noopener noreferrer">Log in with Google</a>
              </button>
            </div>

          </div> 
        : 
          null
      }
    </>
    
  )
}

export default NavbarMenu;
