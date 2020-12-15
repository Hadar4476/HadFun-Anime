import React from 'react';

import { NavLink, Redirect } from 'react-router-dom';

import Joi from 'joi-browser';

import Form from '../../common/form';

import httpService from '../../services/httpService';
import userService from '../../services/userService';
import { apiUrl } from '../../config.json';

class SignUp extends Form {
  state = {
    data: {
      username: '',
      email: '',
      password: '',
      gender: '',
      favorites: [],
    },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .min(3)
      .max(255)
      .label('Username')
      .error(() => {
        return {
          message: 'Invaild username',
        };
      }),
    email: Joi.string()
      .required()
      .min(6)
      .max(255)
      .email()
      .label('Email')
      .error(() => {
        return {
          message: 'Invaild email',
        };
      }),
    password: Joi.string()
      .required()
      .min(5)
      .max(1024)
      .label('Password')
      .error(() => {
        return {
          message: 'Invaild password',
        };
      }),
    gender: Joi.string()
      .required()
      .min(4)
      .max(6)
      .label('Gender')
      .regex(/^(male|Male|female|Female)$/),
    favorites: Joi.array(),
  };

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  doSubmit = async () => {
    const data = { ...this.state.data };
    try {
      await httpService.post(`${apiUrl}/users`, data);
      this.props.history.replace('/sign-in');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data === 'Username is already in use.') {
          this.setState({
            errors: { username: 'Username is already in use.' },
          });
        }
        if (error.response.data === 'Email is already in use.') {
          this.setState({
            errors: { email: 'Email is already in use.' },
          });
        }
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to='/' />;

    return (
      <>
        <div className='container text-center'>
          <div className='row'>
            <div className='col'>
              <div className='sign-up-title'>
                <h1>Sign Up</h1>
              </div>
              <form
                onSubmit={this.handleSubmit}
                action=''
                method='POST'
                autoComplete='on'
                className='sign-up-form bg-white rounded text-left'
              >
                {this.renderInput(
                  'username',
                  'username',
                  'Username:',
                  'form-group'
                )}
                {this.renderInput('email', 'email', 'Email:', 'form-group')}
                {this.renderInput(
                  'password',
                  'password',
                  'Password:',
                  'form-group'
                )}
                {this.renderGenderSelection()}

                <div className='to-sign-in-anchor'>
                  <NavLink to='/sign-in'>
                    Already have an account?
                    <span className='sign-in-span'> Sign in</span>
                  </NavLink>
                </div>

                <div className='absolute-bottom'>
                  {this.renderBtn(
                    'Sign Up',
                    'submit',
                    'sign-up-btn text-white'
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignUp;
