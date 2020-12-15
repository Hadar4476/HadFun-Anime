import React, { Component } from 'react';

import logo from '../images/logo4.png';
import anime from '../images/anime-logo1.png';
import shuriken from '../images/shuriken.png';

import { NavLink } from 'react-router-dom';

class Home extends Component {
  state = {};

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  render() {
    return (
      <>
        <div className='container home-container'>
          <div className='row'>
            <div className='col logos-container'>
              <img className='hadfun-logo' src={logo} alt='hadfun-logo' />
              <span>&</span>
              <img className='anime-logo' src={anime} alt='anime-logo' />
            </div>
            <div className='for'>
              <p>
                For <span>anime</span> lovers.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <div className='navigation-container'>
                <NavLink className='animes-nav' to='/browse-animes'>
                  <img src={shuriken} alt='shuriken-img' /> Browse animes
                </NavLink>
                {!localStorage.getItem('token') && (
                  <NavLink className='sign-in-nav' to='/sign-in'>
                    <i className='fas fa-sign-in-alt'></i>Sign in
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <Animes /> */}
      </>
    );
  }
}

export default Home;
