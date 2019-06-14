import React from 'react';
import { shallow } from 'enzyme';

import RedTooltip from '../RedTooltip';

describe('<RedTooltip/>', () => {
  it('renders the given children', () => {
    const child = <div>child</div>;
    const wrapper = shallow(<RedTooltip>{child}</RedTooltip>);
    expect(wrapper).toContainReact(child);
  });

  it('displays the tooltip when visible is true', () => {
    const wrapper = shallow(<RedTooltip visible={true} />);
    expect(wrapper.find('Tooltip')).toHaveProp('visible', true);
  });

  it('hides the tooltip when visible is false', () => {
    const wrapper = shallow(<RedTooltip visible={false} />);
    expect(wrapper.find('Tooltip')).toHaveProp('visible', false);
  });
});
