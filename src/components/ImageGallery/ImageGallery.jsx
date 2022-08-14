import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { LoadButton } from 'components/Button';
import PicturesApiService from '../../services/pictures-api';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { GalleryContainer } from './ImageGallery.styled';

const picturesApiService = new PicturesApiService();

export function ImageGallery({ searchQuery }) {
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [tags, setTags] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);

    picturesApiService.query = searchQuery;
    picturesApiService.resetPage();
    picturesApiService
      .fetchPictures()
      .then(pictures => setPictures(pictures))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [searchQuery]);

  const onLoadMore = () => {
    setLoading(true);

    picturesApiService.incrementPage();
    picturesApiService
      .fetchPictures()
      .then(pictures =>
        setPictures(prevPictures => [...prevPictures, ...pictures]),
      )
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLargeImg = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    toggleModal();
  };

  const shouldRenderLoadMoreButton = pictures.length > 0 && !loading;

  return (
    <React.Fragment>
      {error && (
        <React.Fragment>
          <h1>Something went wrong!</h1>
          <p>{error.message}</p>
        </React.Fragment>
      )}

      {pictures && (
        <GalleryContainer>
          {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onImageClick={handleLargeImg}
            />
          ))}
        </GalleryContainer>
      )}

      {loading && <Loader />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}

      {shouldRenderLoadMoreButton && <LoadButton onClick={onLoadMore} />}
    </React.Fragment>
  );
}

ImageGallery.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};

//? class

// import { Component } from 'react';

// export class ImageGallery extends Component {
//   state = {
//     pictures: null,
//     loading: false,
//     error: null,
//     showModal: false,
//     largeImageURL: null,
//     tags: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevSearchQuery = prevProps.searchQuery;
//     const nextSearchQuery = this.props.searchQuery;

//     if (prevSearchQuery !== nextSearchQuery) {
//       this.setState({ loading: true });

//       picturesApiService.query = nextSearchQuery;
//       picturesApiService.resetPage();
//       picturesApiService
//         .fetchPictures()
//         .then(pictures => this.setState({ pictures: pictures.hits }))
//         .catch(error => this.setState({ error }))
//         .finally(() => this.setState({ loading: false }));
//     }
//   }

//   onLoadMore = () => {
//     this.setState({ loading: true });

//     picturesApiService.incrementPage();
//     picturesApiService
//       .fetchPictures()
//       .then(pictures =>
//         this.setState(prevState => ({
//           pictures: [...prevState.pictures, ...pictures.hits],
//         })),
//       )
//       .catch(error => this.setState({ error }))
//       .finally(() => this.setState({ loading: false }));
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };

//   handleLargeImg = (largeImageURL, tags) => {
//     this.setState({
//       largeImageURL,
//       tags,
//     });
//     this.toggleModal();
//   };

//   render() {
//     const { pictures, loading, error, showModal, largeImageURL, tags } =
//       this.state;

//     return (
//       <React.Fragment>
//         {pictures && (
//           <GalleryContainer>
//             {pictures.map(({ id, tags, webformatURL, largeImageURL }) => (
//               <ImageGalleryItem
//                 key={id}
//                 tags={tags}
//                 webformatURL={webformatURL}
//                 largeImageURL={largeImageURL}
//                 onImageClick={this.handleLargeImg}
//               />
//             ))}
//           </GalleryContainer>
//         )}

//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}

//         {loading && <Loader />}

//         {pictures && !loading && <LoadButton onClick={this.onLoadMore} />}

//         {error && (
//           <React.Fragment>
//             <h1>Something went wrong!</h1>
//             <p>{error.message}</p>
//           </React.Fragment>
//         )}
//       </React.Fragment>
//     );
//   }
// }
