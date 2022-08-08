import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { GalleryContainer } from './ImageGallery.styled';

const API_KEY = '29121921-8e5b9c13e3f0ecc46ac9f6034';
const BASE_URL = 'https://pixabay.com/api';

export class ImageGallery extends Component {
  state = {
    pictures: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      fetch(
        `${BASE_URL}/?key=${API_KEY}&q=${this.props.searchQuery}&page=1&per_page=4&image_type=photo&orientation=horizontal&safesearch=true`,
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
        })
        .then(pictures => this.setState({ pictures }));
    }
  }

  render() {
    const { pictures } = this.state;
    // const { searchQuery } = this.props;

    // console.log(pictures);
    // if (pictures !== null) {
    //   return pictures.hits.map(picture => console.log(picture));
    // }

    return (
      <React.Fragment>
        {pictures && (
          <GalleryContainer>
            {pictures.hits.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </GalleryContainer>
        )}
      </React.Fragment>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
