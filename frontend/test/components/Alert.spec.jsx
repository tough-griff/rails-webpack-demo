import React from 'react';
import { shallow } from 'enzyme';

import Alert from '../../js/components/Alert';

describe('<Alert />', function () {
  let wrapper;

  const props = {
    clientId: 'abcdefg',
    message: 'Message',
    onClick: sinon.stub(),
    type: 'error',
  };

  beforeEach(function render() {
    wrapper = shallow(<Alert {...props} />);
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('li');
    expect(wrapper).to.have.className('alert error');
    expect(wrapper).to.have.text().match(/Message/);
  });

  it('correctly handles click events', function () {
    wrapper.find('.close').simulate('click');
    expect(props.onClick).to.have.been.calledOnce();
  });
});
