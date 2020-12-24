import React, { Component } from 'react';

import Swal from 'sweetalert2';

import httpService from '../../services/httpService';
import userService from '../../services/userService';
import getJwt from '../../services/storageService';
import { apiUrl, kitsuApi, kitsuHeaders } from '../../config.json';

import AnimeCharacters from './anime-characters';
import AnimeTitle from './anime-title';
import AnimeFacts from './anime-facts';

class SingleAnimePage extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.anime = this.state.anime;
  }
  state = {
    anime: {},
    user: {},
    bookmarked: false,
  };

  componentDidMount = async () => {
    this.is_Mounted = true;
    if (this.is_Mounted) {
      window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      };
      const animeId = this.props.match.params.id;
      const { data } = await httpService.get(`${kitsuApi}/${animeId}`, {
        headers: kitsuHeaders,
      });
      this.anime = data.data;
      this.mapAnime(this.anime);
      document.body.style.background = '#111111';
      document.getElementById('footer').style.color = 'white';
      document.getElementById('oNline_web_anchor').style.color = 'white';
      const user = userService.getCurrentUser();
      this.setState({ anime: this.mapAnime(this.anime), user });
      const { anime } = this.state;
      const token = getJwt.getJwtToken();
      if (token) {
        try {
          const { data } = await httpService.get(`${apiUrl}/users/bookmarks`);
          if (user && data) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].id === anime.id) this.setState({ bookmarked: true });
            }
          }
        } catch (error) {
          return;
        }
      }
    }
  };

  componentWillUnmount() {
    this.is_Mounted = false;
    document.body.style.background = '#feda75';
    document.getElementById('footer').style.color = 'black';
    document.getElementById('oNline_web_anchor').style.color = 'black';
  }

  showFact = (fact) => {
    Swal.fire({
      title: `${fact}`,
      icon: 'info',
      confirmButtonText: 'Ok',
    });
  };

  bookmarkAnime = async () => {
    const { anime, user } = this.state;
    if (!user) {
      Swal.fire({
        title: `Seems like you are not signed in`,
        showCancelButton: true,
        cancelButtonColor: 'rgba(195, 16, 16, 0.966)',
        confirmButtonColor: '	#4f5bd5',
        confirmButtonText: 'Sign in',
      }).then((result) => {
        if (result.value) {
          this.props.history.push('/sign-in');
        }
      });
    } else {
      try {
        await httpService.put(`${apiUrl}/users/bookmark`, anime);
        this.setState({ bookmarked: true });
      } catch (error) {
        return;
      }
    }
  };

  mapAnime = (anime) => {
    return {
      id: anime?.id,
      synopsis: anime.attributes?.synopsis,
      averageRating: anime.attributes?.averageRating,
      canonicalTitle: anime.attributes?.canonicalTitle,
      japaneseTitle: anime.attributes.titles?.ja_jp,
      englishTitle: anime.attributes.titles?.en,
      startDate: anime.attributes?.startDate,
      endDate: anime.attributes?.endDate,
      status:
        anime.attributes?.status.charAt(0).toUpperCase() +
        anime.attributes?.status.slice(1),
      tinyPosterImage: anime.attributes.posterImage?.tiny,
      smallPosterImage: anime.attributes.posterImage?.small,
      mediumPosterImage: anime.attributes.posterImage?.medium,
      largePosterImage: anime.attributes.posterImage?.large,
      originalPosterImage: anime.attributes.posterImage?.original,
      tinyCoverImage: anime.attributes.coverImage?.tiny,
      smallCoverImage: anime.attributes.coverImage?.small,
      largeCoverImage: anime.attributes.coverImage?.large,
      originalCoverImage: anime.attributes.coverImage?.original,
      episodeCount: anime.attributes?.episodeCount,
      youtubeVideoId: anime.attributes?.youtubeVideoId,
      favoritesCount: anime.attributes?.favoritesCount,
    };
  };

  render() {
    const { anime, user, bookmarked } = this.state;
    return (
      <>
        {anime && (
          <div className='container single-anime-page-container'>
            <div className='row'>
              <div className='col'>
                {anime && anime.canonicalTitle && (
                  <AnimeTitle anime={anime} user={user} />
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='bookmark' onClick={this.bookmarkAnime}>
                  <button disabled={bookmarked ? true : false}>
                    <i className='fas fa-bookmark'></i>
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                {anime && anime.originalPosterImage && (
                  <div className='anime-image'>
                    <img
                      className=''
                      src={anime.originalPosterImage}
                      alt={
                        anime.canonicalTitle
                          ? anime.canonicalTitle
                          : anime.englishTitle
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <AnimeFacts anime={anime} showFact={this.showFact} />
              </div>
            </div>
            <div className='row'>
              {anime && anime.synopsis && (
                <div className='col'>
                  <div className='anime-synopsis'>
                    <p>{anime.synopsis}</p>
                  </div>
                </div>
              )}
            </div>
            <div className='row'>
              <div className='col'>
                <AnimeCharacters anime={anime} />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='bookmark' onClick={this.bookmarkAnime}>
                  <button disabled={bookmarked ? true : false}>
                    <i className='fas fa-bookmark'></i>
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default SingleAnimePage;
