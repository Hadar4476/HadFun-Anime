// ******** MODULES **********
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper';
import 'bootstrap/dist/js/bootstrap';

// ******** CSS FILES **********
import './index.css';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.css';
import 'semantic-ui-css/semantic.min.css';
import '../src/css/search-bar.css';
import '../src/css/header.css';
import '../src/css/home.css';
import '../src/css/animes.css';
import '../src/css/topButton.css';
import '../src/css/anime.css';
import '../src/css/single-anime-page.css';
import '../src/css/sign-in.css';
import '../src/css/sign-up.css';
import '../src/css/bookmarks.css';
import '../src/css/404page.css';
import '../src/css/footer.css';
import '../src/css/dark-box.css';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
