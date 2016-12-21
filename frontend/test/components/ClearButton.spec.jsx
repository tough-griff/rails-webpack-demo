import React from 'react';
import { shallow } from 'enzyme';

import ClearButton from '../../js/components/ClearButton';

describe('<ClearButton />', function () {
  const props = {
    onClick: sinon.stub(),
  };

  const wrapper = shallow(<ClearButton {...props} />);

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('button');
    expect(wrapper).to.have.className('clear-completed');
    expect(wrapper).to.have.text('Clear complete');
  });
});
