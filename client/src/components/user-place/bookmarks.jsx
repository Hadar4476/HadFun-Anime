import React, { Component } from 'react';

import Swal from 'sweetalert2';

import { apiUrl } from '../../config.json';
import getJwt from '../../services/storageService';
import httpService from '../../services/httpService';
import userService from '../../services/userService';
import SingleBookmark from './single-bookmark';

import empty_box from '../../images/box.png';
import shuriken from '../../images/shuriken.png';

import { NavLink } from 'react-router-dom';

class Bookmarks extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.anime = this.state.anime;
    this.bookmarks = this.state.bookmarks;
    this.image = React.createRef();
  }

  state = {
    bookmarks: [],
    anime: {},
  };

  componentDidMount = async () => {
    this.setState({ bookmarks: [] });
    this.is_Mounted = true;
    if (this.is_Mounted) {
      const token = getJwt.getJwtToken();
      const user = userService.getCurrentUser();
      if (token) {
        try {
          const { data } = await httpService.get(`${apiUrl}/users/bookmarks`);
          this.bookmarks = data;
          if (user && data) this.setState({ bookmarks: this.bookmarks });
        } catch (error) {
          return;
        }
      }
    }
  };

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  showMore = (anime) => {
    this.setState({ anime });
    return (window.location = `/single-anime-page/${anime.id}`);
  };

  removeBookmark = (anime) => {
    Swal.fire({
      title: `Are you sure you want to remove "${
        anime.canonicalTitle ? anime.canonicalTitle : anime.englishTitle
      }" from your bookmarks?`,
      showCancelButton: true,
      confirmButtonColor: '#189ad3',
      cancelButtonColor: '#e0301e',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.value) {
        Swal.fire({
          title: `"${
            anime.canonicalTitle ? anime.canonicalTitle : anime.englishTitle
          }" has been removed successfully`,
          confirmButtonColor: '#189ad3',
          confirmButtonText: 'Ok',
        });
        await httpService.patch(`${apiUrl}/users/discard-bookmark/${anime.id}`);
        setTimeout(() => {
          return window.location.reload();
        }, 2000);
      }
    });
  };

  render() {
    const { bookmarks } = this.state;
    return (
      <div className='container bookmarks'>
        {bookmarks && bookmarks.length > 0 && (
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4'>
            {bookmarks.map((anime) => (
              <SingleBookmark
                key={anime.id}
                anime={anime}
                showMore={this.showMore}
                removeBookmark={this.removeBookmark}
              />
            ))}
          </div>
        )}
        {bookmarks && bookmarks.length === 0 && (
          <div className='row'>
            <div className='col'>
              <div className='no-bookmarks-yet'>
                <img src={empty_box} alt='empty box' />
                <p>Seems like you yet to bookmark any animes.</p>
                <NavLink className='animes-nav' to='/browse-animes'>
                  <img src={shuriken} alt='shuriken img' /> Browse animes
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Bookmarks;
