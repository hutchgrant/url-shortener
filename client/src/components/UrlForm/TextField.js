import React from 'react';

export default ({
  input,
  type,
  label,
  className,
  disabled,
  placeholder,
  meta: { error, touched, invalid }
}) => {
  const renderError = () => {
    if (touched && error) {
      return (
        <div className="text-danger" style={{ marginBottom: '20px' }}>
          {touched && error}
        </div>
      );
    }
  };
  return (
    <div className={`${className} ${touched && invalid ? 'has-error' : ''}`}>
      <fieldset>
        <input
          {...input}
          disabled={disabled}
          type={type}
          className="url-input"
          style={{ marginBottom: '5px' }}
          placeholder={placeholder}
        />
        <input
          type="submit"
          className="btn btn-primary url-button"
          value="Submit"
        />
      </fieldset>
      {renderError()}
    </div>
  );
};
