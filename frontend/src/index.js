import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import Browse from './Browse';
import Create from './Create';
import NotFound from './NotFound';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/browse" component={Browse} />
      <Route path="/create" component={Create} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));
