import React from 'react';
import { shallow } from 'enzyme';

import FractalRows from '../FractalRows';
import Card from '../Card';

describe('<FractalRows/>', () => {
  it('displays no cards when no fractals are given', () => {
    const wrapper = shallow(<FractalRows fractals={[]} />);
    expect(wrapper.find(Card)).toHaveLength(0);
  });

  it('displays a card for each fractal', () => {
    const fractals = [{ key: 'fractal-1' }, { key: 'fractal-2' }];
    const wrapper = shallow(<FractalRows fractals={fractals} />);
    expect(wrapper.find(Card)).toHaveLength(fractals.length);
  });
});
