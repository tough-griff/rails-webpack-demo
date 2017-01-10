import React from 'react';
import { shallow } from 'enzyme';

import ClearButton from '../../js/components/ClearButton';

describe('<ClearButton />', function () {
  let wrapper;

  const props = {
    onClick: sinon.stub(),
  };

  beforeEach(function () {
    wrapper = shallow(<ClearButton {...props} />);

    props.onClick.reset();
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('button');
    expect(wrapper).to.have.className('clear-completed');
    expect(wrapper).to.have.text('Clear complete');
  });

  it('correctly handles click events', function () {
    wrapper.simulate('click');
    expect(props.onClick).to.have.been.calledOnce();
  });
});
