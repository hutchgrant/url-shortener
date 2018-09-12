import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/guest';
import moment from 'moment';
import Loading from './Loading';
import MainLayout from './Layouts/MainLayout';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      url: ''
    };
  }

  async componentDidMount() {
    await this.props.fetchURL(this.props.match.params.short, true);
    if (this.props.guest) {
      if (this.props.guest.url) {
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false, error: true });
      }
    }
  }

  renderViewers(viewer) {
    return viewer.map(({ ipaddress, date, os, device, browser }, idx) => {
      return (
        <div className="url-viewer" key={'viewer_' + idx}>
          <p>
            Date:
            {moment(date).format('MM/DD/YYYY')}
          </p>
          <p>
            IP:
            {ipaddress}
          </p>
          <p>
            OS:
            {os}
          </p>
          <p>
            Device:
            {device}
          </p>
          <p>
            Browser:
            {browser}
          </p>
        </div>
      );
    });
  }

  render() {
    let { loading, error } = this.state;
    if (!loading && !error) {
      let {
        short,
        long,
        views,
        viewer,
        updatedAt,
        createdAt
      } = this.props.guest.url;
      return (
        <div className="url-info">
          <h2>Short URL: {short} </h2>
          <h4>Long URL: {long} </h4>
          <h5>Created: {moment(createdAt).format('MM/DD/YYYY')}</h5>
          <h5>Updated: {moment(updatedAt).format('MM/DD/YYYY')}</h5>
          <h5>Views: {views}</h5>
          {this.renderViewers(viewer)}
        </div>
      );
    }
    if (loading) {
      return <Loading />;
    }
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
)(MainLayout(Info));
