import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import next from "next/types";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";

type PhotoProps = {
  filePath: string;
  caption: string;
};


const PhotoCarousel = () => {
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [show, setShow] = useState<number>(1);
  const widthRef = useRef<HTMLHeadingElement>(null);
  
  const carouselHeight = getCarouselHeight();
  const carouselPad = 20;

  useEffect(() => {
    setPhotos([
      { filePath: "/gallery/Tufts Legacy-5.jpg", caption: "picture1" },
      { filePath: "/gallery/Tufts Legacy-7.jpg", caption: "picture2" },
      { filePath: "/gallery/Tufts Legacy-270.jpg", caption: "picture3" },
      { filePath: "/gallery/Tufts Legacy-264.jpg", caption: "picture4" },
      { filePath: "/gallery/Tufts Legacy-265.jpg", caption: "picture5" },
      { filePath: "/gallery/Tufts Legacy-261.jpg", caption: "picture6" },
      { filePath: "/gallery/Tufts Legacy-255.jpg", caption: "picture3" },
      { filePath: "/gallery/Tufts Legacy-258.jpg", caption: "picture4" },
    ]);
  }, []);

  function getCarouselHeight() {
    const [elemWidth, setElemWidth] = useState<number>(0);
    
    useEffect(() => {
      function handleResize() { 
        setElemWidth(widthRef.current ? widthRef.current.offsetWidth : 0);
        const showVal = widthRef.current ? Math.floor(widthRef.current.offsetWidth / 250) : 1;
        setShow(showVal || 1);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => { window.removeEventListener("resize", handleResize) }
    }, []);

    return elemWidth / show;
  }
  

  const nextIndex = () => {
    setActiveIndex(activeIndex === show - 1 ? 0 : activeIndex - 1);
  };

  const prevIndex = () => {
    setActiveIndex(activeIndex === 0 ? show - 1 : activeIndex + 1);
  };

  return (
    <div className="flex flex-col w-full place-content-center py-8 gap-y-8"
    >
      {/* gallery title and description */}
      <div className="flex flex-col justify-center w-full gap-y-4">
        <span className="font-serif font-semibold text-center sm:text-left text-3xl sm:text-4xl">
          About Us
        </span>
        <p className="font-serif font-medium tracking-easy text-center text-lg sm:text-left sm:text-xl">
          The Legacy Project is a Tufts organization dedicated to documenting
          and preserving stories of the elder generation. Students create
          meaningful intergenerational connections through weekly visits to
          Medford Rehabilitation center, forming one to one connection with
          residents, sharing lived experiences, and documenting their stories.
          These individuals have made a significant impact on our community
          through their hard work and dedication.
        </p>
      </div>

      {/* photo carousel */}
      <div className="relative flex items-center justify-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          className="hover:cursor-pointer"
          onClick={() => prevIndex()}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M41.0933 44.24L28.8799 32L41.0933 19.76L37.3333 16L21.3333 32L37.3333 48L41.0933 44.24Z"
            fill="#000022"
          />
        </svg>

        <div
          className="relative flex w-full flex-row justify-between ease-in-out overflow-hidden"
          style={{height: carouselHeight - carouselPad}}
          ref={widthRef}
        >
          {
          photos.map(
            (photo, index) =>
              (
                <div
                key={index}
                className={
                  "absolute aspect-square object-cover h-full select-none transition-all"
                }
                style={{
                  left: ((index - activeIndex + show) % show) * (carouselHeight + carouselPad / 2),
                  height: carouselHeight - carouselPad
                }}
              >
                <Image
                  className="object-cover"
                  layout="fill"
                  src={photo.filePath}
                  alt={photo.caption}
                />
              </div>
              )
          )}
        </div>
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          onClick={() => nextIndex()}
          className="hover:cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.9067 19.76L35.1201 32L22.9067 44.24L26.6667 48L42.6667 32L26.6667 16L22.9067 19.76Z"
            fill="#000022"
          />
        </svg>
      </div>
    </div>
  );
};

export default PhotoCarousel;
