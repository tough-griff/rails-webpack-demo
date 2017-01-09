import React from 'react';
import { shallow } from 'enzyme';

import Todo from '../../js/components/Todo';

describe('<Todo />', function () {
  let wrapper;

  const props = {
    canDrop: false,
    connectDragSource: el => el,
    connectDropTarget: el => el,
    createdAt: '2017-01-8T12:00:00.006Z',
    id: 5,
    index: 2,
    isComplete: false,
    isDragging: false,
    isOver: false,
    onChange: sinon.stub(),
    onClick: sinon.stub(),
    onDrop: sinon.stub(),
    onSave: sinon.stub(),
    label: 'label',
    updatedAt: '2017-01-8T12:00:00.006Z',
  };

  beforeEach(function () {
    wrapper = shallow(<Todo {...props} />);

    props.onChange.reset();
    props.onClick.reset();
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('li');
    expect(wrapper).to.have.className('todo');
    expect(wrapper).not.to.have.className('completed');
    expect(wrapper).not.to.have.className('dragging');
    expect(wrapper).not.to.have.className('over');
    expect(wrapper).not.to.have.className('editing');
    expect(wrapper).to.have.text('label');
    expect(wrapper).to.have.descendants('.view');
    expect(wrapper).not.to.have.descendants('.edit');

    expect(wrapper.find('.toggle')).not.to.be.checked();
  });

  it('correctly handles toggling', function () {
    wrapper.find('.toggle').simulate('change');
    expect(props.onChange).to.have.been.calledOnce();
  });

  it('correctly handles clicking delete', function () {
    wrapper.find('.destroy').simulate('click');
    expect(props.onClick).to.have.been.calledOnce();
  });

  context('when completed', function () {
    beforeEach(function render() {
      wrapper = shallow(<Todo {...props} isComplete />);
    });

    it('renders correctly', function () {
      expect(wrapper).to.have.className('completed');

      expect(wrapper.find('.toggle')).to.be.checked();
    });
  });

  context('when dragging', function () {
    beforeEach(function render() {
      wrapper = shallow(<Todo {...props} isDragging />);
    });

    it('renders correctly', function () {
      expect(wrapper).to.have.className('dragging');
    });
  });

  context('when dragged over', function () {
    beforeEach(function render() {
      wrapper = shallow(<Todo {...props} isOver canDrop />);
    });

    it('renders correctly', function () {
      expect(wrapper).to.have.className('over');
    });
  });

  context('when editing', function () {
    beforeEach(function () {
      wrapper.setState({ isEditing: true });
    });

    it('renders correctly', function () {
      expect(wrapper).to.have.className('editing');
      expect(wrapper).to.have.descendants('.edit');
    });
  });

  describe('#onDoubleClick', function () {
    it('sets the state correctly', function () {
      expect(wrapper).to.have.state('isEditing', false);
      wrapper.find('.label').simulate('doubleClick');
      expect(wrapper).to.have.state('isEditing', true);
    });
  });

  describe('#onSave', function () {
    beforeEach(function () {
      props.onSave.reset();

      wrapper.setState({ isEditing: true });
    });

    it('calls onSave correctly', function () {
      wrapper.find('.edit').simulate('save', 'newLabel');
      expect(props.onSave).to.have.been.calledOnce();
      expect(props.onSave).to.have.been.calledWithExactly('newLabel');
      expect(wrapper).to.have.state('isEditing', false);
    });
  });
});
