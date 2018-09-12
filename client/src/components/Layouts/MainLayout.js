import React, { Component } from 'react';

const MainLayout = WrappedComponent => {
  return class extends Component {
    state = {};

    render() {
      return (
        <div className="content container">
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default MainLayout;
