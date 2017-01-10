import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../js/components/Header';

describe('<Header />', function () {
  let wrapper;

  const props = {
    onDoubleClick: sinon.stub(),
    onSave: sinon.stub(),
  };

  beforeEach(function () {
    wrapper = shallow(<Header {...props} />);

    props.onDoubleClick.reset();
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('header');
    expect(wrapper).to.have.className('header');
    expect(wrapper).to.have.descendants('h1');
    expect(wrapper).to.have.descendants('.new-todo');
    expect(wrapper).to.have.text().match(/Todos/);
  });

  it('correctly handles double click events', function () {
    wrapper.find('h1').simulate('doubleClick');
    expect(props.onDoubleClick).to.have.been.calledOnce();
  });
});
