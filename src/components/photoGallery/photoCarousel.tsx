import React, { useState, useEffect } from "react";
import Image from "next/image";

type PhotoCardProps = {
  // width: string;
  // height: string;
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
  caption,
}: PhotoCardProps) => {
  return (
    <Image
      className={"aspect-square h-full w-full rounded-lg object-cover"}
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

  const nextIndex = () => {
    setActiveIndex(activeIndex === show - 1 ? 0 : activeIndex + 1);
  };

  const prevIndex = () => {
    setActiveIndex(activeIndex === 0 ? show - 1 : activeIndex - 1);
  };

  return (
    <div className="mb-[40px] w-full ">
      {/* gallery title and description */}
      <div className="mx-auto mt-[50px] flex h-full flex-row justify-between lg:mt-[101px]">
        <div className="mb-[40px] flex h-full flex-col gap-[24px]">
          <span className="font-serif font-semibold text-black duration-500 sm:text-center sm:text-5xl lg:text-left xl:text-6xl">
            Gallery
          </span>
          <span className="w-full font-serif font-medium text-[#515151] sm:text-lg sm:leading-[32px] lg:text-xl">
            The Legacy Project is a Tufts organization dedicated to documenting
            and preserving stories of the elder generation. Students create
            meaningful intergenerational connections through weekly visits to
            Medford Rehabilitation center, forming one to one connection with
            residents, sharing lived experiences, and documenting their stories.
            These individuals have made a significant impact on our community
            through their hard work and dedication.
          </span>
        </div>
      </div>

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
          className="\ relative flex h-[300px] w-full flex-row justify-between
                        overflow-hidden duration-500"
        >
          {photos.map(
            (photo, index) =>
              index < show && (
                <div
                  key={index}
                  className={
                    "absolute ml-0 aspect-square h-full select-none transition-all lg:ml-[45px]"
                  }
                  style={{
                    left: (((index - activeIndex + show) % show) - 2) * 332,
                  }}
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
