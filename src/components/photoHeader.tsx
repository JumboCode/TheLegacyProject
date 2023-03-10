// Photo Header for Student Home Page

import React from 'react';
import Image from "next/image"

const PhotoHeader = () => {
    return (
        <>
        <div className='lg:p-9 md:p-5 p-3'> 
            <Image className='rounded-lg object-cover'
            src={'/student_home/header1.jpg'} 
            alt={'Photo of flowers on an old book with a faded photo of two people'}
            width={2000} 
            height={500}
            />
        </div>
        <div className='lg:p-0 md:p-5 p-3 border-2 border-blue-500 bg-white-500/75'>
            
        </div> 
        </>
    );
}

export default PhotoHeader;