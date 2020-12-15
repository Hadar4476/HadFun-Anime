import React, { Component } from 'react';

class Anime extends Component {
  is_Mounted = false;
  state = {};

  componentDidMount() {
    this.is_Mounted = true;
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  render() {
    const { anime, showMore } = this.props;
    return (
      <>
        <div className='col'>
          <div className='single-anime' onClick={() => showMore(anime)}>
            <div>
              <p>{anime.canonicalTitle}</p>
              <span>
                <i className='fas fa-info-circle'></i>
              </span>
            </div>
            <img
              src={
                anime.originalPosterImage
                  ? anime.originalPosterImage
                  : anime.largePosterImage || anime.mediumPosterImage
              }
              alt={anime.canonicalTitle}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Anime;
