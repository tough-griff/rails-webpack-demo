import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../js/components/Header';
import TextInput from '../../js/components/TextInput';

describe('<Header />', function () {
  const props = {
    onDoubleClick: sinon.stub(),
    onSave: sinon.stub(),
  };

  const wrapper = shallow(<Header {...props} />);

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('header');
    expect(wrapper).to.have.className('header');
    expect(wrapper).to.have.descendants('h1');
    expect(wrapper).to.have.text().match(/Todos/);

    expect(wrapper).to.have.descendants(TextInput);
  });
});
