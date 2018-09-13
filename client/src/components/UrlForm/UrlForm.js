import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from './TextField';

let field = {
  label: 'URL:',
  name: 'url',
  type: 'text',
  className: 'offset-sm-2 col-sm-8 offset-1 col-10',
  disabled: false,
  defaultValue: '',
  placeholder: 'http://www.yoursite.com',
  message: 'You must enter a valid url e.g. http://whatever.com',
  regex: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)?$/
};

class UrlForm extends Component {
  async onSubmit(value) {
    await this.props.createShortURL(value);
    this.props.reset();
  }

  renderForm() {
    let {
      label,
      name,
      type,
      className,
      defaultValue,
      disabled,
      placeholder
    } = field;
    return (
      <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <Field
          component={TextField}
          type={type}
          label={label}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          value={defaultValue}
        />
      </form>
    );
  }

  renderShortURL() {
    if (this.props.guest) {
      let { short } = this.props.guest;
      if (short) {
        return (
          <div className="row">
            <div className="col-md-12 url-short">
              {process.env.REACT_APP_DOMAIN}
              {short}
            </div>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{this.renderForm()}</div>
        </div>
        {this.renderShortURL()}
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  let { name, regex, message } = field;
  if (!values[name]) {
    errors[name] = message;
  }
  if (values[name] && regex.test(values[name]) === false) {
    errors[name] = message;
  }

  return errors;
}

UrlForm = reduxForm({
  validate,
  form: 'urlForm',
  destroyOnUnmount: true
})(UrlForm);

export default UrlForm;
