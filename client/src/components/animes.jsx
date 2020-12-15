import React, { Component } from 'react';

import Swal from 'sweetalert2';

import $ from 'jquery';

import httpService from '../services/httpService';
import { kitsuApi, kitsuHeaders } from '../config.json';

import Anime from './anime';
import SearchBar from './search-bar';
import TopButton from '../common/topButton';

class Animes extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.anime = this.state.anime;
    this.animes = this.state.animes;
    this.next = this.state.next;
  }
  state = {
    animes: [],
    anime: {},
    next: {},
  };

  componentDidMount = async () => {
    $(window).scrollTop(0);
    this.is_Mounted = true;
    if (this.is_Mounted) {
      const { data } = await httpService.get(`${kitsuApi}`, {
        headers: kitsuHeaders,
      });
      this.next = data.links.next;
      for (let i = 0; i < data.data.length; i++) {
        this.anime = data.data[i];
        let filteredAnime = this.mapAnime(this.anime);
        this.animes.push(filteredAnime);
      }
      this.setState({ animes: this.animes, next: this.next });
      let timeout;
      $(window).scroll(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if (
            $(window).scrollTop() + $(window).height() >
            $(document).height() - 200
          ) {
            this.nextAnime();
          } else {
            return;
          }
        }, 100);
      });
    }
  };

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  showMore = (anime) => {
    this.setState({ anime });
    return this.props.history.push(`/single-anime-page/${anime.id}`);
  };

  nextAnime = async () => {
    if (!this.next) return;
    const { data } = await httpService.get(`${this.next}`, {
      headers: kitsuHeaders,
    });
    if (data.links.next) this.next = data.links.next;
    if (!data.links.next) this.next = null;
    for (let i = 0; i < data.data.length; i++) {
      this.anime = data.data[i];
      let filteredAnime = this.mapAnime(this.anime);
      this.animes.push(filteredAnime);
    }
    const filteredAnimes = [
      ...new Map(this.animes.map((anime) => [anime.id, anime])).values(),
    ];
    this.setState({ animes: filteredAnimes, next: this.next });
  };

  resetSearch = async (searchInput) => {
    if (!searchInput) {
      const { data } = await httpService.get(`${kitsuApi}`, {
        headers: kitsuHeaders,
      });
      let emptyAnimes = [];
      this.animes = emptyAnimes;
      if (data.links.next) this.next = data.links.next;
      for (let i = 0; i < data.data.length; i++) {
        this.anime = data.data[i];
        let filteredAnime = this.mapAnime(this.anime);
        this.animes.push(filteredAnime);
      }
      this.setState({ animes: this.animes, next: this.next });
    }
  };

  searchForAnime = async (searchInput) => {
    if (!searchInput) return;
    const { data } = await httpService.get(
      `${kitsuApi}?filter[text]=${searchInput}`,
      {
        headers: kitsuHeaders,
      }
    );
    if (data.data.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "We Don't Have That Anime Here.",
      });
      return;
    }
    let searchedAnimes = [];
    this.animes = searchedAnimes;
    if (data.links.next) this.next = data.links.next;
    if (!data.links.next) this.next = null;
    for (let i = 0; i < data.data.length; i++) {
      this.anime = data.data[i];
      let filteredAnime = this.mapAnime(this.anime);
      this.animes.push(filteredAnime);
    }
    this.setState({ animes: this.animes, next: this.next });
  };

  mapAnime = (anime) => {
    return {
      id: anime?.id,
      createdAt: anime.attributes?.createdAt,
      synopsis: anime.attributes?.synopsis,
      averageRating: anime.attributes?.averageRating,
      canonicalTitle: anime.attributes?.canonicalTitle,
      startDate: anime.attributes?.startDate,
      endDate: anime.attributes?.endDate,
      status: anime.attributes?.status,
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
    };
  };

  render() {
    const { animes } = this.state;
    return (
      <>
        <TopButton animes={animes} />
        <div className='container animes-container'>
          <div className='row'>
            <div className='col'>
              <SearchBar
                searchForAnime={this.searchForAnime}
                resetSearch={this.resetSearch}
              />
            </div>
          </div>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4'>
            {animes &&
              animes.length > 0 &&
              animes.map((anime) => (
                <Anime key={anime.id} anime={anime} showMore={this.showMore} />
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default Animes;
