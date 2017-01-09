import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import mockStore from '../support/mockStore';
import TodoList from '../../js/components/TodoList';

describe('<TodoList />', function () {
  let wrapper;

  const todos = [];

  const props = {
    completeCount: 1,
    count: 2,
    isLoading: false,
    onMount: sinon.stub(),
    onToggleAll: sinon.stub(),
    todos,
    todosFilter: 'all',
  };

  // NOTE: Shallow seems to break when rendering with connected children.
  beforeEach(function render() {
    wrapper = mount(
      <Provider store={mockStore}>
        <TodoList {...props} />
      </Provider>
    );
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('section');
    expect(wrapper).to.have.className('main');
    // TODO
  });

  // ...
  // TODO
  // ...
});
