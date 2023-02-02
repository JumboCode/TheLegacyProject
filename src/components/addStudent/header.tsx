import React from 'react';

type HeaderProps = {
  title: string;
  icon?: JSX.Element;
}

const Header = ({
  title,
  icon
}: HeaderProps) => {
  return (
    <div className='flex flex-row justify-between items-center m-auto w-[96%] h-[14%]'>
      <span className='text-4xl font-medium text-[#000022] leading-[140%]'>{title}</span>
      {/* subject to change */}
      <div className='w-16 h-16 rounded-full bg-[#BCDFFB]'>  
        {icon}
      </div>
    </div>
  )
}

export default Header;
