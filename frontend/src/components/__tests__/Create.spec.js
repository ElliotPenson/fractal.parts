import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import Create from '../Create';

describe('<Create/>', () => {
  it('deeply renders without crashing', () => {
    ReactDOM.render(
      <Router>
        <Create />
      </Router>,
      document.createElement('div')
    );
  });

  it('displays an error when no title is given', () => {
    const wrapper = shallow(<Create />);
    const component = wrapper.instance();
    component.handleTemplate(document.createElement('canvas'));
    component.validate();
    expect(wrapper.find('EditableTitle')).toHaveProp('hasError', true);
  });

  it('validates the form when a title is given', () => {
    const wrapper = shallow(<Create />);
    const component = wrapper.instance();
    component.handleTemplate(document.createElement('canvas'));
    wrapper.find('EditableTitle').simulate('change', 'Title');
    component.validate();
    expect(wrapper.find('EditableTitle')).toHaveProp('hasError', false);
  });
});
