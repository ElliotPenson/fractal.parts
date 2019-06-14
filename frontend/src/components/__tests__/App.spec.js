import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../App';

describe('<App/>', () => {
  it('deeply renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <App />
      </Router>,
      document.createElement('div')
    );
  });

  it('displays two buttons', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toContainMatchingElements(2, 'Button');
  });
});
