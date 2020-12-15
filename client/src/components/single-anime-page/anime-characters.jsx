import React, { Component } from 'react';

import httpService from '../../services/httpService';
import { kitsuApi, kitsuHeaders } from '../../config.json';

class AnimeCharacters extends Component {
  is_Mounted = false;
  constructor(props) {
    super(props);
    this.anime = this.state.anime;
    this.next = this.state.next;
    this.prev = this.state.prev;
    this.character = this.state.character;
    this.characters = this.state.characters;
  }
  state = {
    anime: {},
    next: {},
    prev: {},
    character: {},
    characters: [],
    prev_clicked: false,
    next_clicked: false,
  };

  componentDidMount = async () => {
    this.is_Mounted = true;
    if (this.is_Mounted) {
      setTimeout(async () => {
        const { anime } = this.props;
        this.anime = anime;
        this.setState({ anime: this.anime });
        const { data } = await httpService.get(
          `${kitsuApi}/${anime.id}/characters`,
          {
            headers: kitsuHeaders,
          }
        );
        if (data.links.next) this.next = data.links.next;
        if (!data.links.next) this.next = null;
        if (!data.links.prev) this.prev = null;
        let characterUrl;
        data.data.map(async (item) => {
          characterUrl = item.relationships.character.links.related;
          const { data } = await httpService.get(`${characterUrl}`, {
            headers: kitsuHeaders,
          });
          this.character = data.data;
          if (!this.character.attributes.image) return;
          this.mapAnimeCharacter(this.character);
          this.characters.push(this.mapAnimeCharacter(this.character));
          this.setState({
            next: this.next,
            prev: this.prev,
            characters: this.characters,
          });
        });
      }, 1000);
    }
  };

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  nextPage = async () => {
    if (!this.next) return;
    this.setState({ next_clicked: true });
    setTimeout(async () => {
      const { data } = await httpService.get(`${this.next}`, {
        headers: kitsuHeaders,
      });
      if (data.links.next) this.next = data.links.next;
      if (data.links.prev) this.prev = data.links.prev;
      if (!data.links.next) this.next = null;
      if (!data.links.prev) this.prev = null;
      this.characters = [];
      let characterUrl;
      data.data.map(async (item) => {
        characterUrl = item.relationships.character.links.related;
        const { data } = await httpService.get(`${characterUrl}`, {
          headers: kitsuHeaders,
        });
        this.character = data.data;
        if (!this.character.attributes.image) return;
        this.mapAnimeCharacter(this.character);
        this.characters.push(this.mapAnimeCharacter(this.character));
        this.setState({
          next: this.next,
          prev: this.prev,
          characters: this.characters,
        });
      });
    }, 1000);
    setTimeout(() => {
      this.setState({ next_clicked: false });
    }, 2000);
  };

  prevPage = async () => {
    if (!this.prev) return;
    this.setState({ prev_clicked: true });
    setTimeout(async () => {
      const { data } = await httpService.get(`${this.prev}`, {
        headers: kitsuHeaders,
      });
      if (data.links.next) this.next = data.links.next;
      if (data.links.prev) this.prev = data.links.prev;
      if (!data.links.next) this.next = null;
      if (!data.links.prev) this.prev = null;
      this.characters = [];
      let characterUrl;
      data.data.map(async (item) => {
        characterUrl = item.relationships.character.links.related;
        const { data } = await httpService.get(`${characterUrl}`, {
          headers: kitsuHeaders,
        });
        this.character = data.data;
        if (!this.character.attributes.image) return;
        this.mapAnimeCharacter(this.character);
        this.characters.push(this.mapAnimeCharacter(this.character));
        this.setState({
          next: this.next,
          prev: this.prev,
          characters: this.characters,
        });
      });
    }, 1000);
    setTimeout(() => {
      this.setState({ prev_clicked: false });
    }, 2000);
  };

  mapAnimeCharacter = (character) => {
    return {
      id: character?.id,
      canonicalName: character.attributes?.canonicalName,
      englishName: character.attributes.names?.en,
      japaneseName: character.attributes.names?.ja_jp,
      otherNames: character.attributes?.otherNames,
      characterImage: character.attributes.image?.original,
    };
  };

  render() {
    const { characters, next_clicked, prev_clicked } = this.state;
    return (
      <>
        {characters && characters.length > 0 && (
          <div className='characters'>
            <h1>Characters</h1>
            <div className='container'>
              <div className='row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5'>
                {characters &&
                  characters.length > 0 &&
                  characters.map((character) => (
                    <div key={character.id} className='col'>
                      {character && character.characterImage && (
                        <div className='character'>
                          <img
                            src={character.characterImage}
                            alt={character.englishName}
                          />
                          <p>{character.englishName}</p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
            <div className='container'>
              <div className='row'>
                <div className='col'>
                  <div className='characters-control-panel'>
                    <button
                      className='prev'
                      disabled={
                        prev_clicked ? true : false || !this.prev ? true : false
                      }
                      onClick={this.prevPage}
                    >
                      {prev_clicked ? (
                        <span className='spinner-border'></span>
                      ) : (
                        <span>
                          <i className='fas fa-backward'></i>
                        </span>
                      )}
                    </button>
                    <button
                      className='next'
                      disabled={
                        next_clicked ? true : false || !this.next ? true : false
                      }
                      onClick={($event) => this.nextPage($event)}
                    >
                      {next_clicked ? (
                        <span className='spinner-border'></span>
                      ) : (
                        <span>
                          <i className='fas fa-forward'></i>
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default AnimeCharacters;
