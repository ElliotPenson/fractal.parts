import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from '../Navbar';

describe('<Navbar/>', () => {
  it('renders four links', () => {
    const wrapper = mount(
      <Router>
        <Navbar />
      </Router>
    );
    expect(wrapper.find('a')).toHaveLength(4);
  });
});
