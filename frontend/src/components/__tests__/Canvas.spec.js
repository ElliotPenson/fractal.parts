import React from 'react';
import { shallow } from 'enzyme';

import Canvas from '../Canvas';

describe('<Canvas/>', () => {
  it('displays a canvas', () => {
    const wrapper = shallow(<Canvas />);
    expect(wrapper).toContainMatchingElement('canvas');
  });

  it('sets the canvas width and height', () => {
    const width = 123;
    const height = 456;
    const wrapper = shallow(<Canvas width={width} height={height} />);
    expect(wrapper.find('canvas')).toHaveProp('width', width);
    expect(wrapper.find('canvas')).toHaveProp('height', height);
  });
});
