import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../js/components/Footer';
import ClearButton from '../../js/components/ClearButton';

describe('<Footer />', function () {
  let wrapper;

  const props = {
    canDrop: false,
    completeCount: 0,
    connectDropTarget: el => el,
    count: 0,
    isOver: true,
    maxIndex: 0,
    onClick: sinon.stub(),
    onDrop: sinon.stub(),
    todosFilter: 'all',
  };

  beforeEach(function render() {
    wrapper = shallow(<Footer {...props} />);
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('footer');
    expect(wrapper).to.have.className('footer');
    expect(wrapper).to.have.descendants('.todo-count');
    expect(wrapper).to.have.text().match(/0 tasks remaining/);
    expect(wrapper).to.have.descendants('.filters');
    expect(wrapper).to.have.exactly(3).descendants('.filter');
  });

  context('with a zero complete count', function () {
    it('does not render the clear complete button', function () {
      expect(wrapper).not.to.have.descendants(ClearButton);
    });
  });

  context('with a nonzero complete count', function () {
    beforeEach(function render() {
      wrapper = shallow(<Footer {...props} completeCount={1} count={2} />);
    });

    it('renders the clear complete button', function () {
      expect(wrapper).to.have.descendants(ClearButton);
    });
  });
});
