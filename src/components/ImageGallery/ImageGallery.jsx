import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { LoadButton } from 'components/Button';
import PicturesApiService from '../../services/pictures-api';
import { GalleryContainer } from './ImageGallery.styled';

const picturesApiService = new PicturesApiService();

export class ImageGallery extends Component {
  state = {
    pictures: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      picturesApiService.query = this.props.searchQuery;
      picturesApiService.resetPage();
      picturesApiService
        .fetchPictures()
        .then(pictures => this.setState({ pictures: pictures.hits }));
    }
  }

  onLoadMore = () => {
    picturesApiService.incrementPage();
    picturesApiService.fetchPictures().then(pictures =>
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...pictures.hits],
      })),
    );
  };

  render() {
    const { pictures } = this.state;

    return (
      <React.Fragment>
        {pictures && (
          <GalleryContainer>
            {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </GalleryContainer>
        )}
        {pictures && <LoadButton onClick={this.onLoadMore} />}
      </React.Fragment>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
