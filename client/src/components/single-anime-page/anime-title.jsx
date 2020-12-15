import React, { Component } from 'react';

class AnimeTitle extends Component {
  state = {};

  render() {
    const { anime } = this.props;
    return (
      <>
        <div className='anime-title'>
          <div className='titles'>
            {anime && anime.canonicalTitle && (
              <p className='english-title'>
                {anime.canonicalTitle
                  ? anime.canonicalTitle
                  : anime.englishTitle}
              </p>
            )}
            {anime && anime.japaneseTitle && (
              <p className='japanese-title'>{anime.japaneseTitle}</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default AnimeTitle;
