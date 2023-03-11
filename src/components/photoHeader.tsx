// Photo Header for Student Home Page

import React from 'react';
import Image from "next/image"

const PhotoHeader = () => {
    return (
        <>  
            <div className="pb-9">
                <div className='lg:m-9 md:m-5 m-4 relative'>
                    <Image className='rounded-lg object-cover'
                    src={'/student_home/header1.jpg'} 
                    alt={'Photo of flowers on an old book with a faded photo of two people'}
                    width={2000} 
                    height={500}
                    />
                    <div className='rounded-lg bg-white bg-opacity-90 backdrop-blur-sm w-[98%] h-20 absolute right-0 -bottom-12 md:-bottom-10 flex p-3 items-center'>
                        <Image className='rounded-lg' src={'/student_home/profile_photo_pic.jpeg'} alt={'Profile Photo'} width={56} height={56}/>
                        <div className='flex flex-col pl-3 text-neutral-600'>
                            <h5 className='font-bold'>Angela Han</h5>
                            <p className=''>email@legacy.org</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default PhotoHeader;