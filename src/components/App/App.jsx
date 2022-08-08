import React, { Component } from 'react';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';

// const API_KEY = '29121921-8e5b9c13e3f0ecc46ac9f6034';
// const BASE_URL = 'https://pixabay.com/api';

export class App extends Component {
  state = {
    searchQuery: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  componentDidMount() {
    // fetch(
    //   `${BASE_URL}/?key=${API_KEY}&q=cat&page=1&per_page=4&image_type=photo&orientation=horizontal&safesearch=true`,
    // )
    //   .then(res => res.json())
    //   .then(pictures => this.setState({ pictures }));
  }

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </Container>
    );
  }
}
