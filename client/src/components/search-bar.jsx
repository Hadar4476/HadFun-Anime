import React, { Component } from 'react';

class SearchBar extends Component {
  is_Mounted = false;
  state = {};

  componentDidMount() {
    this.is_Mounted = true;
    if (this.is_Mounted) {
      let dark = document.getElementById('dark');
      document.body.addEventListener('click', () => {
        dark.className = 'd-none';
      });
    }
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  onEnterKey = (e) => {
    const { searchForAnime } = this.props;
    if (!e.target.value) return;
    if (e.keyCode === 13) {
      e.preventDefault();
      let dark = document.getElementById('dark');
      dark.className = 'd-none';
      searchForAnime(e.target.value);
    }
  };

  onInputClick = (e) => {
    e.target.placeholder = '';
    let dark = document.getElementById('dark');
    dark.className = 'dark center';
  };

  render() {
    const { searchForAnime, resetSearch } = this.props;
    return (
      <>
        <div className='d-none' id='dark'></div>
        <div className='search-bar'>
          <input
            autoComplete='on'
            type='search'
            className='form-control'
            id='searchInput'
            placeholder='Search for anime'
            onBlur={(e) => {
              e.target.placeholder = 'Search for anime';
            }}
            onClick={this.onInputClick}
            onKeyUp={this.onEnterKey}
            onChange={(e) => resetSearch(e.target.value)}
          />
          <button
            onClick={() =>
              searchForAnime(document.getElementById('searchInput').value)
            }
          >
            <i className='fas fa-search'></i>
          </button>
        </div>
      </>
    );
  }
}

export default SearchBar;
