import { Component } from 'react';

import userService from '../../services/userService';

class LogOut extends Component {
  componentDidMount() {
    userService.logout();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

export default LogOut;
