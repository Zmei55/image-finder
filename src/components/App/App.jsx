import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery searchQuery={this.state.searchQuery} />
      </Container>
    );
  }
}

App.propTypes = {
  searchQuery: PropTypes.string,
};
