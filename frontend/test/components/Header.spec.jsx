import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../js/components/Header';

describe('<Header />', function () {
  let wrapper;

  const props = {
    onDoubleClick: sinon.stub(),
    onSave: sinon.stub(),
  };

  beforeEach(function render() {
    wrapper = shallow(<Header {...props} />);
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('header');
    expect(wrapper).to.have.className('header');
    expect(wrapper).to.have.descendants('h1');
    expect(wrapper).to.have.descendants('.new-todo');
    expect(wrapper).to.have.text().match(/Todos/);
  });
});
