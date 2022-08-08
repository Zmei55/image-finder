// import { Component } from 'react';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ webformatURL, largeImageURL }) {
  // console.log(webformatURL);
  // console.log(largeImageURL);
  return (
    <GalleryItem>
      <Img src={webformatURL} alt="" />
    </GalleryItem>
  );
}
