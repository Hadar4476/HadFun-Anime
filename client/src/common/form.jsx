import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './input';

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderInput = (type = 'text', inputName, labelHTML, formGroupClassName) => {
    const { data, errors } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        type={type}
        inputName={inputName}
        labelHTML={labelHTML}
        formGroupClassName={formGroupClassName}
        value={data[inputName]}
        error={errors[inputName]}
      />
    );
  };

  getGender = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderGenderSelection() {
    return (
      <div className='gender-form-container'>
        <p>Select a gender :</p>
        <div className='gender-form-group'>
          <input
            type='radio'
            id='male'
            name='gender'
            value='male'
            onClick={this.getGender}
          />
          <label htmlFor='male'>Male</label>
        </div>
        <div className='gender-form-group'>
          <input
            type='radio'
            id='female'
            name='gender'
            value='female'
            onClick={this.getGender}
          />
          <label htmlFor='female'>Female</label>
        </div>
      </div>
    );
  }

  renderBtn(html, type, className) {
    return (
      <button onClick={this.validate} type={type} className={className}>
        {html}
      </button>
    );
  }
}

export default Form;
