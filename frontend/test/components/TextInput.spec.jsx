import { ENTER, SPACEBAR } from 'key-code';
import React from 'react';
import { shallow } from 'enzyme';

import TextInput from '../../js/components/TextInput';

describe('<TextInput />', function () {
  let wrapper;

  const props = {
    className: 'className',
    onSave: sinon.stub(),
    placeholder: 'placeholder',
    value: 'value',
  };

  beforeEach(function render() {
    wrapper = shallow(<TextInput {...props} />);
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('input');
    expect(wrapper).to.have.className('className');
    expect(wrapper).to.have.attr('placeholder', 'placeholder');
    expect(wrapper).to.have.attr('value', 'value');
  });

  context('with no provided value', function () {
    beforeEach(function render() {
      wrapper = shallow(<TextInput {...props} value={null} />);
    });

    it('renders correctly', function () {
      expect(wrapper).not.to.have.attr('value', 'value');
    });
  });

  describe('#onBlur()', function () {
    beforeEach(function () {
      props.onSave.reset();

      wrapper.simulate('blur');
    });

    it('calls onSave correctly', function () {
      expect(props.onSave).to.have.been.calledOnce();
    });

    it('sets the state correctly', function () {
      expect(wrapper).to.have.text('');
    });
  });

  describe('#onChange()', function () {
    it('sets state correctly', function () {
      wrapper.simulate('change', { target: { value: 'newValue' } });
      expect(wrapper).to.have.attr('value', 'newValue');
    });
  });

  describe('#onKeyDown()', function () {
    beforeEach(function () {
      props.onSave.reset();
    });

    it('calls onSave correctly', function () {
      wrapper.simulate('keyDown', { keyCode: SPACEBAR });
      expect(props.onSave).not.to.have.been.called();
      wrapper.simulate('keyDown', { keyCode: ENTER });
      expect(props.onSave).to.have.been.calledOnce();
    });
  });
});
