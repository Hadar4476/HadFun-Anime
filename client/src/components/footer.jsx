import React from 'react';
import { Component } from 'react';

import footer from '../images/footer-logo.png';

class Footer extends Component {
  state = {
    year: new Date().getFullYear(),
  };

  onFooterLogoClick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  render() {
    const { year } = this.state;
    return (
      <div className='container footer-container'>
        <div className='row'>
          <div className='col'>
            <div
              id='footer'
              className='footer'
              onClick={this.onFooterLogoClick}
            >
              <img src={footer} alt='footer-logo' />
              <span>&copy; {year}</span>
            </div>
            <div className='oNline-web-link'>
              <a id='oNline_web_anchor' href='http://www.onlinewebfonts.com'>
                oNline Web Fonts
              </a>
            </div>
          </div>
        </div>
        <div className='filler'></div>
      </div>
    );
  }
}

export default Footer;
