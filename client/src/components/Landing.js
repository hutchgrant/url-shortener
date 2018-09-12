import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/guest';
import UrlForm from './UrlForm/UrlForm';
import UrlList from './UrlForm/UrlList';

class Landing extends Component {
  renderUrls() {
    if (this.props.guest && this.props.guest.urls) {
      return <UrlList urls={this.props.guest.urls} />;
    }
  }

  render() {
    return (
      <div className="main">
        <div className="url-header">
          <h2 className="url-title text-center">Shorten Your URLs</h2>
          <UrlForm {...this.props} />
        </div>
        <div className="content-w-header">{this.renderUrls()}</div>
      </div>
    );
  }
}

function mapStateToProps({ guest }) {
  return {
    guest
  };
}

export default connect(
  mapStateToProps,
  actions
)(Landing);
