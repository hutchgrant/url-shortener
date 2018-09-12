import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <p className="text-center">
              <a href="https://github.com/hutchgrant/react-boilerplate">
                &nbsp;Copyright 2018 Grant Hutchinson&nbsp;
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
