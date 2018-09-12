import React, { Component } from 'react';

const MainLayout = WrappedComponent => {
  return class extends Component {
    state = {};

    render() {
      return (
        <div className="full-layout">
          <div className="full-content">
            <div className="content container">
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  };
};

export default MainLayout;
