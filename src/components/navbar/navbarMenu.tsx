import React from 'react';
import { NavbarItem } from './index';

type toggleMenu = {
  active: boolean;
} 

const NavbarMenu = ({ active }: toggleMenu) => {
  return (
    <>
      {/* dropdown */}
      { active ? 
          <div className='md:hidden sticky top-20 z-40 bg-white py-14 border-t-2 border-gray-200'>

            <div className='flex flex-col justify-center items-center m-auto'>
              <NavbarItem inMenu={active} label='About' to='/about' />
              <NavbarItem inMenu={active} label='Contact Us' to='/contact' />
              <button className='bg-gray-700 text-l text-white font-semibold py-3 px-4 my-4 rounded-full'>
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
