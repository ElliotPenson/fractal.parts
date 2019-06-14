import React from 'react';
import { shallow } from 'enzyme';

import Attractor from '../Attractor';

describe('<Attractor/>', () => {
  it('is empty when no fractal is given', () => {
    const wrapper = shallow(<Attractor />);
    expect(wrapper).toBeEmptyRender();
  });

  it('shows a canvas when given a fractal', () => {
    const fractal = { title: 'test', body: { parent: [] } };
    const wrapper = shallow(<Attractor fractal={fractal} />);
    expect(wrapper).toContainMatchingElement('Canvas');
  });
});
