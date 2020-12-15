import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import axios from 'axios';
import getJwt from './services/storageService';
import { apiUrl } from './config.json';
import httpService from './services/httpService';
import userService from './services/userService';

import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header';
import Home from './components/home';
import Animes from './components/animes';
import SignIn from './components/user-place/sign-in';
import SignUp from './components/user-place/sign-up';
import Bookmarks from './components/user-place/bookmarks';
import LogOut from './components/user-place/logout';
import SingleAnimePage from './components/single-anime-page/single-anime-page';
import Page404 from './common/404Page';
import Footer from './components/footer';
import ProtectedRoute from './common/protected-route';

class App extends Component {
  state = {};
  componentDidMount = async () => {
    axios.defaults.headers.common['x-auth-token'] = getJwt.getJwtToken();
    const token = getJwt.getJwtToken();
    const currentUser = userService.getCurrentUser();
    this.setState({ currentUser });
    if (token) {
      try {
        const { data } = await httpService.get(`${apiUrl}/users/me`, token);
        if (currentUser && data) {
          this.setState({ user: data });
        }
      } catch (error) {
        return;
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <header>
          <Switch>
            <Header />
          </Switch>
        </header>
        <main>
          <Switch>
            <ProtectedRoute path='/user-bookmarks' component={Bookmarks} />
            <Route path='/single-anime-page/:id' component={SingleAnimePage} />
            <Route path='/log-out' component={LogOut} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/sign-in' component={SignIn} />
            <Route path='/browse-animes' component={Animes} />
            <Route exact path='/' component={Home} />
            <Route path='*' exact={true} component={Page404} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
