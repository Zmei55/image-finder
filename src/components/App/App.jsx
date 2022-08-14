import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery searchQuery={searchQuery} />
    </Container>
  );
}

App.propTypes = {
  searchQuery: PropTypes.string,
};

//? class

// import React, { Component } from 'react';

// export class App extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleFormSubmit = searchQuery => {
//     this.setState({ searchQuery });
//   };

//   render() {
//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGallery searchQuery={this.state.searchQuery} />
//       </Container>
//     );
//   }
// }
