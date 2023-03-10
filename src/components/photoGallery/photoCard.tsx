import React from 'react';
import Image from "next/image"

type PhotoCardPic = {
  filePath: string;
  caption: string;
};

const PhotoCard: React.FunctionComponent<PhotoCardPic> = ({filePath, caption}) => {
  return (
    <Image className='rounded-lg object-cover'
      src={filePath} 
      alt={caption} 
      width={300} 
      height={300}
    />
  );
}

export default PhotoCard;
