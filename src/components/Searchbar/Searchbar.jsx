import { Component } from 'react';
import { SearchHeader, SearchForm, Button, Input } from './Searchbar.styled';
import { ImSearch } from 'react-icons/im';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return alert('Enter search value');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <Button type="submit">
            <ImSearch size={24} />
          </Button>

          <Input
            type="text"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleQueryChange}
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}
