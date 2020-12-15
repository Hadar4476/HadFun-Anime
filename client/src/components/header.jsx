import React, { Component } from 'react';

import { NavLink, Link } from 'react-router-dom';

import logo from '../images/logo2.png';
import anime from '../images/anime-logo3.png';
import shuriken from '../images/shuriken.svg';

class Header extends Component {
  state = {
    show: false,
    count: 0,
  };

  componentDidMount() {
    const main = document.getElementsByTagName('main');
    main[0].addEventListener('click', () => {
      this.setState({ show: false, count: 0 });
    });
  }

  toggleDropDownMenu = () => {
    let { count } = this.state;
    this.setState({ count: ++count });
    count % 2 === 0
      ? this.setState({ show: false })
      : this.setState({ show: true });
  };

  onLogOutBtnClick = () => {
    this.setState({ show: false });
  };

  render() {
    const { show } = this.state;
    return (
      <>
        <nav>
          <div className='logos-nav'>
            <Link to='/'>
              <img className='hadfun-logo' src={logo} alt='hadFun-logo' />
            </Link>
            <span>&</span>
            <img className='anime-logo' src={anime} alt='anime-logo' />
          </div>
          {localStorage.getItem('token') && (
            <div className='user-panel' onClick={this.toggleDropDownMenu}>
              <i className='fas fa-user-circle'></i>
            </div>
          )}
          {!localStorage.getItem('token') && (
            <div className='shuriken-logo'>
              <img src={shuriken} alt='shuriken' />
            </div>
          )}
        </nav>
        <div className={show ? 'user-menu' : 'd-none'}>
          <div>
            <NavLink className='menu-item' to='/user-bookmarks'>
              My bookmarks
            </NavLink>
            <br />
            <NavLink
              className='menu-item'
              to='/log-out'
              onClick={this.onLogOutBtnClick}
            >
              Logout
            </NavLink>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
