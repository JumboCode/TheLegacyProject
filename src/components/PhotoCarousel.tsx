"use client";

import "src/styles/animation.css";
import React from "react";
import NextImage from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

interface PhotoCarouselParams {
  imagePaths: string[];
}

const Image = ({ path }: { path: string }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [preloaded, setPreloaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setPreloaded(true);
    }, 2000);
  }, []);

  return (
    <div className={"aspect-square h-full w-full"}>
      {(!preloaded || !loaded) && <Skeleton className="h-full w-full" />}
      <NextImage
        className={preloaded && loaded ? "object-cover" : "invisible"}
        src={path}
        alt="Gallery"
        layout="fill"
        data-loaded="false"
        onLoadingComplete={() => {
          setLoaded(true);
        }}
      />
    </div>
  );
};

const PhotoCarousel = ({ imagePaths }: PhotoCarouselParams) => {
  const photos = React.useMemo(
    () => imagePaths.map((path) => <Image key={path} path={path} />),
    [imagePaths]
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      partialVisbile={false}
      sliderClass="gap-x-4"
      swipeable={false}
      ssr
    >
      {photos}
      {/* @note - We add an empty div because the last image is cut */}
      <div />
    </Carousel>
  );
};

export default PhotoCarousel;
