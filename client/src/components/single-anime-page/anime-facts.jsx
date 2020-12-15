import React, { Component } from 'react';

class AnimeFacts extends Component {
  is_Mounted = true;
  state = {};

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  render() {
    const { anime, showFact } = this.props;
    return (
      <div className='anime-facts'>
        <div className='rates-btn'>
          <span>
            <i className='far fa-star'></i>
          </span>
          <button
            onClick={() =>
              showFact(
                `${anime.canonicalTitle} has an average rate of ${anime.averageRating}%`
              )
            }
          >
            Rates
          </button>
        </div>
        <div className='episodes-btn'>
          <span>
            <i className='fas fa-book'></i>
          </span>
          <button
            onClick={() =>
              showFact(
                `${anime.canonicalTitle} has a number of ${anime.episodeCount} episodes`
              )
            }
          >
            Episodes
          </button>
        </div>
        <div className='status-btn'>
          <span>
            <i className='fas fa-thermometer-quarter'></i>
          </span>
          <button
            onClick={() =>
              showFact(`${anime.canonicalTitle} is ${anime.status} airing`)
            }
          >
            Status
          </button>
        </div>
        <div className='started-btn'>
          <span>
            <i className='fas fa-clock'></i>
          </span>
          <button
            onClick={() =>
              showFact(
                `${anime.canonicalTitle} has started at ${anime.startDate}`
              )
            }
          >
            Aired date
          </button>
        </div>
        <div className='ended-btn'>
          <span>
            <i className='fas fa-table'></i>
          </span>
          <button
            onClick={() =>
              showFact(`${anime.canonicalTitle} has ended at ${anime.endDate}`)
            }
          >
            Finished date
          </button>
        </div>
        <div className='bookmarks-btn'>
          <span>
            <i className='far fa-bookmark'></i>
          </span>
          <button
            onClick={() =>
              showFact(
                `${anime.canonicalTitle} has been bookmarked ${anime.favoritesCount} times`
              )
            }
          >
            Bookmakrs
          </button>
        </div>
      </div>
    );
  }
}

export default AnimeFacts;
