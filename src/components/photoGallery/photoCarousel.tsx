import React, { useState, useEffect } from "react";
import PhotoCard from "./photoCard";

type PhotoProps = {
  filePath: string;
  caption: string;
};

type CarouselProps = {
  show: number;
};

const PhotoCarousel = ({ show }: CarouselProps) => {
  const [photos, setPhotos] = useState<PhotoProps[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setPhotos([
      { filePath: "/gallery/p1.png", caption: "picture1" },
      { filePath: "/gallery/p2.png", caption: "picture2" },
      { filePath: "/gallery/p3.png", caption: "picture3" },
      { filePath: "/gallery/p4.png", caption: "picture4" },
      { filePath: "/gallery/p5.png", caption: "picture5" },
      { filePath: "/gallery/p6.png", caption: "picture6" },

      { filePath: "/gallery/p1.png", caption: "picture1" },
      { filePath: "/gallery/p2.png", caption: "picture2" },
      { filePath: "/gallery/p3.png", caption: "picture3" },
      { filePath: "/gallery/p4.png", caption: "picture4" },
      { filePath: "/gallery/p5.png", caption: "picture5" },
      { filePath: "/gallery/p6.png", caption: "picture6" },
    ]);
  }, []);

  const nextIndex = () => {
    setActiveIndex(activeIndex === show - 1 ? 0 : activeIndex + 1);
    // console.log(activeIndex)
  };

  const prevIndex = () => {
    setActiveIndex(activeIndex === 0 ? show - 1 : activeIndex - 1);
    // console.log(activeIndex)
  };

  return (
    <div className="h-[684px] w-full bg-[#F5F0EA]">
      <div className="mx-auto mt-[50px] mb-[30px] flex h-[230px] w-[86%] flex-row justify-between lg:mt-[101px] lg:mb-0 lg:h-[182px]">
        <div className="top-[56px] left-24 flex h-[191px] w-[517px] flex-col items-start gap-[24px] p-0 lg:h-[143px]">
          <span className="h-[67px] w-[165px] text-5xl font-semibold leading-[140%] text-black">
            Gallery
          </span>
          <span className="h-[100px] w-full text-base font-medium leading-[160%] text-[#515151] lg:h-[52px]">
            These individuals have made a significant impact on our community
            through their hard work and dedication.
          </span>
        </div>
        <div className="flex h-[191px] w-[152px] flex-row items-end justify-between lg:h-[143px]">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M41.0933 44.24L28.8799 32L41.0933 19.76L37.3333 16L21.3333 32L37.3333 48L41.0933 44.24Z"
              fill="#000022"
              className="hover:cursor-pointer"
              onClick={() => prevIndex()}
            />
          </svg>
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.9067 19.76L35.1201 32L22.9067 44.24L26.6667 48L42.6667 32L26.6667 16L22.9067 19.76Z"
              fill="#000022"
              className="hover:cursor-pointer"
              onClick={() => nextIndex()}
            />
          </svg>
        </div>
      </div>
      <div className="relative mx-auto flex h-[300px] w-[85%] flex-row overflow-hidden rounded-lg md:w-[90%]">
        {photos.map(
          (photo, index) =>
            index < show && (
              <div
                key={index}
                className={`left absolute h-[300px] w-[300px] rounded-lg`}
                style={{
                  left: ((index - activeIndex + show) % show) * 332,
                }}
              >
                <PhotoCard
                  filePath={`${photo.filePath}`}
                  caption={`${photo.caption}`}
                />
              </div>
            )
        )}
        {/* {photos.map(
          (photo, index) =>
            index < show && (
              <div
                key={index}
                className={`absolute left-[${
                  ((index - activeIndex + show) % show) * 332
                }px] h-[300px] w-[300px] rounded-lg`}
              >
                <PhotoCard
                  filePath={`${photo.filePath}`}
                  caption={`${photo.caption}`}
                />
              </div>
            )
        )} */}
      </div>
    </div>
  );
};

export default PhotoCarousel;
