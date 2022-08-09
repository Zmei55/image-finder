import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { LoadButton } from 'components/Button';
import PicturesApiService from '../../services/pictures-api';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
// import { ThreeDots } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { GalleryContainer } from './ImageGallery.styled';

const picturesApiService = new PicturesApiService();

export class ImageGallery extends Component {
  state = {
    pictures: null,
    loading: false,
    error: null,
    showModal: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ loading: true });

      picturesApiService.query = this.props.searchQuery;
      picturesApiService.resetPage();
      picturesApiService
        .fetchPictures()
        .then(pictures => this.setState({ pictures: pictures.hits }))
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  onLoadMore = () => {
    this.setState({ loading: true });

    picturesApiService.incrementPage();
    picturesApiService
      .fetchPictures()
      .then(pictures =>
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pictures.hits],
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { pictures, loading, showModal } = this.state;

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
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src="" alt="" />
          </Modal>
        )}
        {loading && <Loader />}
        {pictures && !loading && <LoadButton onClick={this.onLoadMore} />}
      </React.Fragment>
    );
  }
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
