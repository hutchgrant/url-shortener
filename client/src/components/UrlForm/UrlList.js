import React from 'react';

const UrlList = ({ urls }) => {
  const renderItems = () => {
    return urls.map(({ short, long }, idx) => {
      return (
        <div className="url-item" key={'url_' + idx}>
          <p>
            {long} <br />
            <a href={window.location.href + short}>
              {window.location.href + short}
            </a>{' '}
            <br />
            <a href={window.location.href + 'info/' + short}>More Info</a>{' '}
            <br />
          </p>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="offset-1 col-10 url-items">{renderItems()}</div>
      </div>
    </div>
  );
};

export default UrlList;
