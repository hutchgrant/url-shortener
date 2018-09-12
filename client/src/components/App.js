import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import Page from './Page';
import Info from './Info';
import Error404 from './Error404';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path={'/'} component={Landing} props={this.props} />
            <Route
              exact
              path={'/info/:short'}
              component={Info}
              props={this.props}
            />
            <Route path={'/:short'} component={Page} props={this.props} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
