import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/guest';
import Loading from './Loading';
import Error404 from './Error404';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      url: ''
    };
  }

  async componentDidMount() {
    await this.props.fetchURL(this.props.match.params.short, false);
    if (this.props.guest) {
      if (this.props.guest.url) {
        window.location = this.props.guest.url.long;
        this.setState({ loading: false, url: this.props.guest.url.long });
      } else {
        this.setState({ loading: false, error: true });
      }
    }
  }

  render() {
    let { loading, error, url } = this.state;
    if (!loading && !error) {
      return (
        <div>
          <h2>Redirecting to {url}</h2>
        </div>
      );
    }
    if (loading) {
      return <Loading />;
    }
    if (error && !loading) {
      return <Error404 />;
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
)(Page);
