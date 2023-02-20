import React, { useState, useEffect } from 'react';
import PhotoCard from './photoCard';

type PhotoProps = {
  filePath: string;
  caption: string;
}

type CarouselProps = {
  show: number;
}

const PhotoCarousel = ({
  show
}: CarouselProps) => {
  const [photos, setPhotos] = useState<PhotoProps[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  useEffect(() => {
    setPhotos([
      { filePath: '/gallery/p1.png', caption: 'picture1' },
      { filePath: '/gallery/p2.png', caption: 'picture2' },
      { filePath: '/gallery/p3.png', caption: 'picture3' },
      { filePath: '/gallery/p4.png', caption: 'picture4' },
      { filePath: '/gallery/p5.png', caption: 'picture5' },
      { filePath: '/gallery/p6.png', caption: 'picture6' },

      { filePath: '/gallery/p1.png', caption: 'picture1' },
      { filePath: '/gallery/p2.png', caption: 'picture2' },
      { filePath: '/gallery/p3.png', caption: 'picture3' },
      { filePath: '/gallery/p4.png', caption: 'picture4' },
      { filePath: '/gallery/p5.png', caption: 'picture5' },
      { filePath: '/gallery/p6.png', caption: 'picture6' },
    ])
  }, [])

  const nextIndex = () => {
    setActiveIndex(
      activeIndex === show - 1 ? 0 : activeIndex + 1
    )
    // console.log(activeIndex)
  }

  const prevIndex = () => {
    setActiveIndex(
      activeIndex === 0 ? show - 1 : activeIndex - 1
    )
    // console.log(activeIndex)
  }

  return (
    <div className='bg-[#F5F0EA] w-full h-[684px]'>
      <div className='w-[86%] h-[230px] lg:h-[182px] justify-between flex flex-row mx-auto mt-[50px] mb-[30px] lg:mt-[101px] lg:mb-0'>
        <div className='flex flex-col items-start p-0 gap-[24px] w-[517px] h-[191px] lg:h-[143px] top-[56px] left-24'>
          <span className='w-[165px] h-[67px] font-semibold text-5xl text-[#515151] leading-[140%]'>
            Gallery
          </span>
          <span className='w-full h-[100px] lg:h-[52px] font-medium text-base leading-[160%] text-[#515151]'>
            These individuals have made a significant impact on our community through their hard work and dedication.
          </span>
        </div>
        <div className='w-[152px] h-[191px] lg:h-[143px] flex flex-row justify-between items-end'>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M41.0933 44.24L28.8799 32L41.0933 19.76L37.3333 16L21.3333 32L37.3333 48L41.0933 44.24Z" fill="#000022" 
              className='hover:cursor-pointer'
              onClick={() => prevIndex()}
            />
          </svg>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.9067 19.76L35.1201 32L22.9067 44.24L26.6667 48L42.6667 32L26.6667 16L22.9067 19.76Z" fill="#000022"
              className='hover:cursor-pointer'
              onClick={() => nextIndex()}
            />
          </svg>
        </div>
      </div>
      <div className='flex flex-row relative w-[85%] md:w-[90%] h-[300px] mx-auto overflow-hidden rounded-lg'>
        {photos.map((photo, index) => (
          index < show && 
          <div key={index} className={`absolute left-[${((index - activeIndex + show) % show) * 332}px] w-[300px] h-[300px] rounded-lg`}>
            <PhotoCard filePath={`${photo.filePath}`} caption={`${photo.caption}`} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoCarousel;

// const [lefts, setLefts] = useState<number[][]>([
//   [0, 332, 664, 996, 1328, 1660],
//   [332, 664, 996, 1328, 1660, 0],
//   [664, 996, 1328, 1660, 0, 332],
//   [996, 1328, 1660, 0, 332, 664],
//   [1328, 1660, 0, 332, 664, 996],
//   [1660, 0, 332, 664, 996, 1328],
// ])

// <div className={`absolute left-[${lefts[activeIndex]![0]}px] w-[300px] h-[300px] rounded-lg transition-transform`}>
//   <PhotoCard filePath='/gallery/p1.png' caption='picture1' />
// </div>  
// <div className={`absolute left-[${lefts[activeIndex]![1]}px] w-[300px] h-[300px] rounded-lg transition-transform`}>
//   <PhotoCard filePath='/gallery/p2.png' caption='picture1' />
// </div>  
// <div className={`absolute left-[${lefts[activeIndex]![2]}px] w-[300px] h-[300px] rounded-lg transition-transform`}>
//   <PhotoCard filePath='/gallery/p3.png' caption='picture1' />
// </div>  
// <div className={`absolute left-[${lefts[activeIndex]![3]}px] w-[300px] h-[300px] rounded-lg transition-transform`}>
//   <PhotoCard filePath='/gallery/p4.png' caption='picture1' />
// </div>  
// <div className={`absolute left-[${lefts[activeIndex]![4]}px] w-[300px] h-[300px] rounded-lg transition-transform`}>
//   <PhotoCard filePath='/gallery/p5.png' caption='picture1' />
// </div>  
// <div className={`absolute left-[${lefts[activeIndex]![5]}px] w-[300px] h-[300px] rounded-lg transition-transform`}>
//   <PhotoCard filePath='/gallery/p6.png' caption='picture1' />
// </div>
