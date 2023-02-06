import React, { useState } from 'react';
import PhotoCard from './photoCard';

const PhotoGallery = () => {
  const [currImageIndex, setCurrImageIndex] = useState(0);

  // const prevImage = () => {
  //   currImageIndex--
  // };

  // const nextImage = () => {
  //   currImage1Index++
  //   currImage2Index++
  //    .map(Image, index) -> index the image for us 
  // };

  return (
    <>
      {/* <div className='max-w-[1440px] max-h-[684px] w-full m-auto relative bg-[#F5F0EA]'>
        <div className=''>
          
        </div>
      </div> */}
      <div id="photoGalleyCarousel" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner flex overflow-hidden relative m-auto w-full h-[50vh]">
          <div className="carousel-item active relative float-left w-full">
            <PhotoCard filename="/gallery_photos/p1.png"/>
          </div>
          <div className="carousel-item relative float-left w-full">
            <PhotoCard filename="/gallery_photos/p2.png"/>
          </div>
          <div className="carousel-item relative float-left w-full">
            <PhotoCard filename="/gallery_photos/p3.png"/>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </>
  );
}

export default PhotoGallery;