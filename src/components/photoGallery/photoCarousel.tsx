import React, { useState, useEffect } from "react";
import Image from "next/image";

type PhotoCardProps = {
  width: string;
  height: string;
  filePath: string;
  caption: string;
};


type PhotoProps = {
  filePath: string;
  caption: string;
};

type CarouselProps = {
  show: number;
};

const PhotoCard: React.FunctionComponent<PhotoCardProps> = ({
  filePath,
  caption
}: PhotoCardProps) => {
  return (
    <Image
      className={"rounded-lg object-cover aspect-square h-full w-full"}
      src={filePath}
      alt={caption}
      layout="fill"
    />
  );
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
      ]);
    }, 
    []);

  const nextIndex = () => {
    setActiveIndex(activeIndex === show - 1 ? 0 : activeIndex + 1);
  };

  const prevIndex = () => {
    setActiveIndex(activeIndex === 0 ? show - 1 : activeIndex - 1);
  };

  return (
    <div className="w-full mb-[40px] ">
      {/* gallery title and description */}
      <div className="flex flex-row h-full mx-auto mt-[50px] justify-between lg:mt-[101px]">
        <div className="flex flex-col h-full gap-[24px] mb-[40px]">
          <span className="xl:text-6xl sm:text-5xl sm:text-center lg:text-left font-serif font-semibold text-black duration-500">
            Gallery
          </span>
          <span className="w-full sm:text-lg lg:text-xl font-medium font-serif sm:leading-[32px] text-[#515151]">
            The Legacy Project is a Tufts organization dedicated to documenting and preserving stories of the elder generation. 
            Students create meaningful intergenerational connections through weekly visits to Medford Rehabilitation center, 
            forming one to one connection with residents, sharing lived experiences, and documenting their stories. These
            individuals have made a significant impact on our community through their hard work and dedication.
          </span>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
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

        <div className="relative flex flex-row w-full space-x-4 justify-between duration-500 \
                        overflow-hidden xl:h-[300px] lg:h-[270px] md:h-[240px] sm:h-[210px]">
          {photos.map(
            (photo, index) =>
              index < show && (
                <div
                  key={index}
                  className={"absolute h-full aspect-square"} 
                  style = {{left: ((index - activeIndex + show) % show) * 332}}
                >
                  <PhotoCard
                    filePath={`${photo.filePath}`}
                    caption={`${photo.caption}`}
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
