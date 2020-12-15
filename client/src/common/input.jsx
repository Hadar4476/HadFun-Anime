import React from 'react';

const Input = ({
  inputName,
  labelHTML,
  InputClassName,
  formGroupClassName,
  error,
  ...rest
}) => {
  return (
    <div className={formGroupClassName}>
      <label className='form-label' htmlFor={inputName}>
        {labelHTML}
      </label>
      <input
        {...rest}
        className={
          error
            ? 'form-control form-input-error mt-3'
            : 'form-control form-input mt-3'
        }
        id={inputName}
        name={inputName}
        autoComplete='on'
      />
      <span className={error ? 'show m-1' : 'hidden'}>* {error}</span>
    </div>
  );
};

export default Input;
