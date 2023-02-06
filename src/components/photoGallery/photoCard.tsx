import React, { useState } from 'react';
import Image from "next/image"

type PhotoCardPic = {
    filename: string;
  };

const PhotoCard: React.FunctionComponent<PhotoCardPic> = ({filename}) => {
    return(
        <>
            <Image src={filename} alt="icon" width={2000} height={2000} className="block w-full"/>
        </>
    );
}

export default PhotoCard;