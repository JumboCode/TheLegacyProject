import React from 'react';
import Image from "next/image"

type PhotoCardPic = {
  filePath: string;
};

const PhotoCard: React.FunctionComponent<PhotoCardPic> = ({filePath}) => {
  return (
    <Image className='rounded-lg'
      src={filePath} 
      alt="icon" 
      width={300} 
      height={300} 
    />
  );
}

export default PhotoCard;
