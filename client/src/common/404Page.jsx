import React, { Component } from 'react';

import lock from '../images/padlock.png';

class Page404 extends Component {
  state = {};
  render() {
    return (
      <>
        <div className='container not-found-container'>
          <div className='row'>
            <div className='col'>
              <img src={lock} alt='lock' />
              <p>This content isn't available right now.</p>
              <button onClick={() => this.props.history.replace('/')}>
                <i className='fas fa-home'></i>Go back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Page404;
