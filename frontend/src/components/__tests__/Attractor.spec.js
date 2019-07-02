import React from 'react';
import { shallow } from 'enzyme';

import Attractor from '../Attractor';
import FractalSkeleton from '../FractalSkeleton';

describe('<Attractor/>', () => {
  it('displays a skeleton when no fractal is given', () => {
    const wrapper = shallow(<Attractor />);
    expect(wrapper).toContainMatchingElement(FractalSkeleton);
  });

  it('shows a canvas when given a fractal', () => {
    const fractal = { title: 'test', body: { parent: [] } };
    const wrapper = shallow(<Attractor fractal={fractal} />);
    expect(wrapper).toContainMatchingElement('Canvas');
  });
});
