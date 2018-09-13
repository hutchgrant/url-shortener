import _ from 'lodash';
import React, { Component } from 'react';

class Paginate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: 1,
      end: this.props.maxPaginate
    };
  }

  renderPageNums() {
    let arr = [];
    let { start, end } = this.state;
    const { maxPaginate, pageAmt, current } = this.props;
    end = maxPaginate > pageAmt ? pageAmt : end;

    for (var i = start; i <= end; i++) {
      arr.push(i);
    }
    return _.map(arr, i => {
      if (i === current) {
        return (
          <li className="page-item active" key={i}>
            <a className="page-link" href="#current">
              {i} <span className="sr-only">(current)</span>
            </a>
          </li>
        );
      } else {
        return (
          <li className="page-item" key={i}>
            <a
              style={{ cursor: 'pointer' }}
              onClick={() => this.pageChanged(i)}
              to="#"
              className="page-link"
            >
              {i}
            </a>
          </li>
        );
      }
    });
  }

  pageChanged(page) {
    this.props.pageChanged(page);
    const { current, maxPaginate, pageAmt } = this.props;
    let { start, end } = this.state;

    if (pageAmt > maxPaginate) {
      if (page >= 3 && pageAmt > maxPaginate) {
        if (page < current && page < end - 2) {
          start = start - 1;
          end = end - 1 >= maxPaginate ? end - 1 : maxPaginate;
        } else {
          start = page - 1;
          end = end + 1;
          end = end > pageAmt ? pageAmt : end;
          start = end === pageAmt ? pageAmt - maxPaginate + 1 : start;
        }
      } else {
        if (page < current) {
          start = start - 1 >= 1 ? start - 1 : 1;
          end = end - 1 >= maxPaginate ? end - 1 : maxPaginate;
        } else {
          end = pageAmt > maxPaginate ? maxPaginate : pageAmt;
        }
      }
      this.setState({ start, end });
    }
  }

  Prev() {
    const { current } = this.props;
    if (current - 1 >= 1) {
      this.pageChanged(current - 1);
    }
  }

  Next() {
    const { current, pageAmt } = this.props;
    if (current + 1 <= pageAmt) {
      this.pageChanged(current + 1);
    }
  }

  render() {
    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.Prev.bind(this)}
              aria-label="Previous"
              className="page-link"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {this.renderPageNums()}
          <li className="page-item">
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.Next.bind(this)}
              aria-label="Next"
              className="page-link"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Paginate;
