import React, { Component } from 'react';

class SingleBookmark extends Component {
  is_Mounted = false;
  state = {};

  componentDidMount() {
    this.is_Mounted = true;
  }

  componentWillUnmount() {
    this.is_Mounted = false;
  }

  render() {
    const { anime, showMore, removeBookmark } = this.props;
    return (
      <>
        <div className='col'>
          <div className='single-bookmark'>
            <div>
              <p>{anime.canonicalTitle}</p>
                          {this.props.children}
              <span onClick={() => showMore(anime)}>
                <i className='fas fa-info-circle'></i>
              </span>
              <button onClick={() => removeBookmark(anime)}>
                <i className='fas fa-trash-alt'></i>Remove
              </button>
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

export default SingleBookmark;
