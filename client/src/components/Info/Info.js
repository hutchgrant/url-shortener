import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/guest';
import moment from 'moment';
import Loading from '../Loading';
import MainLayout from '../Layouts/MainLayout';
import Chart from './Chart';
import Paginate from './Paginate';

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      current: 1,
      maxItems: 10,
      pages: 1,
      items: [],
      sort: 'date',
      direction: 'desc',
      maxPaginate: 5
    };
  }

  async componentDidMount() {
    await this.props.fetchURL(this.props.match.params.short, true);
    if (this.props.guest) {
      let { url } = this.props.guest;
      if (url) {
        this.setState({
          pages: Math.ceil(url.views / this.state.maxItems),
          loading: false,
          error: false
        });
      } else {
        this.setState({ loading: false, error: true });
      }
    } else {
      this.setState({ loading: false, error: true });
    }
  }

  async pageChanged(page, sort, direction, maxItems, search) {
    this.setState({ current: page });
    if (!sort && !direction) {
      sort = this.state.sort;
      direction = this.state.direction;
    }
    if (!maxItems) {
      maxItems = this.state.maxItems;
    }
    if (!search) {
      search = '';
    }
    await this.props.fetchViewers(
      this.props.guest.url._id,
      page,
      maxItems,
      sort,
      direction,
      search
    );
    if (this.props.guest.url.viewers) {
      this.setState({
        items: this.props.guest.url.viewers,
        pages: Math.ceil(this.props.guest.url.views / this.state.maxItems)
      });
    }
  }

  renderViewers(viewers) {
    const renderAgents = () => {
      return viewers.map(({ ipaddress, date, os, device, browser }, idx) => {
        return (
          <tr key={'viewer_' + idx}>
            <td>{moment(date).format('MM/DD/YYYY h:mm:ss a')}</td>
            <td>{ipaddress}</td>
            <td>{os}</td>
            <td>{device}</td>
            <td>{browser}</td>
          </tr>
        );
      });
    };
    if (viewers.length > 0) {
      return (
        <div className="table-responsive-sm">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Date</th>
                <th>IP</th>
                <th>OS</th>
                <th>Device</th>
                <th>Browser</th>
              </tr>
            </thead>
            <tbody>{renderAgents()}</tbody>
          </table>
        </div>
      );
    }
  }

  renderPaginate(views) {
    let { current, pages, maxPaginate } = this.state;
    if (views > 0) {
      return (
        <Paginate
          current={current}
          pageAmt={pages}
          pageChanged={this.pageChanged.bind(this)}
          maxPaginate={maxPaginate}
        />
      );
    }
  }

  render() {
    let { loading, error } = this.state;
    if (!loading && !error) {
      let { url, dailyviews, viewers } = this.props.guest;
      let { short, long, views, updatedAt, createdAt } = url;
      return (
        <div>
          <div className="url-info">
            <div className="row">
              <div className="col-md-8 col-12">
                <p>
                  <span id="short-url">
                    Short URL:{' '}
                    <a href={process.env.REACT_APP_DOMAIN + short}>
                      {process.env.REACT_APP_DOMAIN}
                      {short}
                    </a>
                  </span>
                  <br />
                  <span id="long-url">Long URL: {long}</span> <br />
                  Created: {moment(createdAt).format(
                    'MM/DD/YYYY h:mm:ss a'
                  )}{' '}
                  <br />
                  Updated: {moment(updatedAt).format(
                    'MM/DD/YYYY h:mm:ss a'
                  )}{' '}
                  <br />
                </p>
              </div>
              <div className="col-md-4 col-12 info-right">
                <span id="views">Total Views: {views}</span> <br />
                <div className="btn-group">
                  <button className="btn-primary">7d</button>
                  <button className="btn-primary">1w</button>
                  <button className="btn-primary">1m</button>
                  <button className="btn-primary">1y</button>
                </div>
              </div>
            </div>
            <div className="chart">
              <Chart data={dailyviews} />
            </div>
            {this.renderViewers(viewers)}
            {this.renderPaginate(views)}
          </div>
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
