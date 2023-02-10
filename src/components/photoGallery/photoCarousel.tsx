import React, { useState } from 'react';
import PhotoCard from './photoCard';

const PhotoCarousel = () => {
  return (
    <div className='bg-[#F5F0EA] w-full h-[684px]'>
      {/* text section */}
      <div className='w-[86%] h-[230px] lg:h-[182px] justify-between flex flex-row mx-auto mt-[50px] mb-[30px] lg:mt-[101px] lg:mb-0'>
        {/* text */}
        <div className='flex flex-col items-start p-0 gap-[24px] w-[517px] h-[191px] lg:h-[143px] top-[56px] left-24'>
          <span className='w-[165px] h-[67px] font-semibold text-5xl text-[#515151] leading-[140%]'>
            Gallery
          </span>
          <span className='w-full h-[100px] lg:h-[52px] font-medium text-base leading-[160%] text-[#515151]'>
            These individuals have made a significant impact on our community through their hard work and dedication.
          </span>
        </div>
        {/* gallery nav */}
        <div className='w-[152px] h-[191px] lg:h-[143px] flex flex-row justify-between items-end'>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M41.0933 44.24L28.8799 32L41.0933 19.76L37.3333 16L21.3333 32L37.3333 48L41.0933 44.24Z" fill="#000022"/>
          </svg>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9067 19.76L35.1201 32L22.9067 44.24L26.6667 48L42.6667 32L26.6667 16L22.9067 19.76Z" fill="#000022"/>
          </svg>
        </div>
      </div>
      {/* gallery carousel */}
      <div className='flex flex-row relative max-w-[90%] w-full h-[300px] overflow-x-hidden mx-auto'>
        {/* image components */}
        <div className='absolute left-0 w-[300px] h-[300px] rounded-lg'>
          <PhotoCard filePath='/gallery/p1.png'/>
        </div>  
        <div className='absolute left-[332px] w-[300px] h-[300px] rounded-lg'>
          <PhotoCard filePath='/gallery/p2.png'/>
        </div>  
        <div className='absolute left-[664px] w-[300px] h-[300px] rounded-lg'>
          <PhotoCard filePath='/gallery/p3.png'/>
        </div>  
        <div className='absolute left-[996px] w-[300px] h-[300px] rounded-lg'>
          <PhotoCard filePath='/gallery/p4.png'/>
        </div>  
        <div className='absolute left-[1328px] w-[300px] h-[300px] rounded-lg'>
          <PhotoCard filePath='/gallery/p5.png'/>
        </div>  
        <div className='absolute left-[1660px] w-[300px] h-[300px] rounded-lg'>
          <PhotoCard filePath='/gallery/p6.png'/>
        </div>
      </div>
    </div>
  )
}

export default PhotoCarousel;
