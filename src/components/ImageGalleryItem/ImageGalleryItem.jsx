// import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  tags,
  webformatURL,
  largeImageURL,
  onImageClick,
}) {
  // console.log(webformatURL);
  // console.log(largeImageURL);
  return (
    <GalleryItem>
      <Img
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(largeImageURL, tags)}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
