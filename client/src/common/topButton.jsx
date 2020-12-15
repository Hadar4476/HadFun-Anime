import React, { Component } from 'react';

import $ from 'jquery';

class TopButton extends Component {
  is_Moutned = false;

  state = {};

  componentDidMount = () => {
    this.is_Moutned = true;
    if (this.is_Moutned) {
      let timeout;
      $(window).scroll(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          if ($(document).height() - 200) {
            $('#top_btn').attr('class', 'top-btn');
          }
          if ($(window).scrollTop() === 0) {
            $('#top_btn').attr('class', 'd-none');
          }
        }, 100);
      });
    }
  };

  goUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <div id='top_btn' className='d-none' onClick={this.goUp}>
              <span>
                <i className='fas fa-hand-point-up'></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopButton;
