import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import View from '../View';

describe('<View/>', () => {
  it('deeply renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <View />
      </Router>,
      document.createElement('div')
    );
  });
});
