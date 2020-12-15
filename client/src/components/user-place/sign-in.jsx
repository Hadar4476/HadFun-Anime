import React from 'react';

import { NavLink, Redirect } from 'react-router-dom';

import Joi from 'joi-browser';

import Form from '../../common/form';

import userService from '../../services/userService';

class SignIn extends Form {
  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {},
  };

  schema = {
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
  };

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      this.props.history.push('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        this.setState({ errors: { email: error.response.data } });
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
              <div className='sign-in-title'>
                <h1>Sign In</h1>
              </div>
              <form
                onSubmit={this.handleSubmit}
                action=''
                method='POST'
                className='sign-in-form text-left bg-white rounded'
                autoComplete='on'
              >
                {this.renderInput('email', 'email', 'Email:', 'form-group')}
                {this.renderInput(
                  'password',
                  'password',
                  'Password:',
                  'form-group'
                )}

                <div className='to-sign-up-anchor'>
                  <NavLink to='/sign-up'>
                    Don't have an account?
                    <span className='sign-up-span'> Sign up</span>
                  </NavLink>
                </div>

                <div className='absolute-bottom'>
                  {this.renderBtn(
                    'Sign In',
                    'submit',
                    'sign-in-btn text-white'
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

export default SignIn;
