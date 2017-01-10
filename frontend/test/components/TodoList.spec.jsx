import React from 'react';
import { shallow } from 'enzyme';

// import Alert from '../../js/components/Alert';
// import Footer from '../../js/components/Footer';
import TodoList from '../../js/components/TodoList';

// NOTE: FIXME notices regard expectations that cause tests to fail due to deep
//   rendering occurring despite using `shallow`.
describe('<TodoList />', function () {
  let wrapper;

  const todos = [{
    createdAt: '2017-01-8T12:00:00.006Z',
    id: 1,
    index: 1,
    isComplete: true,
    label: 'Todo 1',
    updatedAt: '2017-01-8T12:00:00.006Z',
  }, {
    createdAt: '2017-01-8T12:00:00.006Z',
    id: 2,
    index: 2,
    isComplete: false,
    label: 'Todo two',
    updatedAt: '2017-01-8T12:00:00.006Z',
  }];

  const props = {
    completeCount: 1,
    count: 2,
    isLoading: false,
    onMount: sinon.stub(),
    onToggleAll: sinon.stub(),
    todos,
    todosFilter: 'all',
  };

  beforeEach(function render() {
    wrapper = shallow(<TodoList {...props} />);

    props.onMount.reset();
    props.onToggleAll.reset();
  });

  it('renders correctly', function () {
    // FIXME: expect(wrapper).to.have.tagName('section');
    expect(wrapper).to.have.className('main');

    expect(wrapper.find('.toggle-all')).not.to.be.checked();

    // FIXME: expect(wrapper).to.have.exactly(2).descendants(Todo);
    expect(wrapper.find('.todo-list').children()).to.have.length(2);

    expect(wrapper.find('.loading-indicator')).not.to.be.present();

    // FIXME: expect(wrapper).to.have.descendants(Footer);
  });

  it('makes the correct call on mount');
  // it('makes the correct call on mount', function () {
  //   expect(props.onMount).to.have.been.calledOnce();
  // });

  it('correctly handles the toggle event', function () {
    wrapper.find('.toggle-all').simulate('change');
    expect(props.onToggleAll).to.have.been.calledOnce();
  });

  context('when all todos are checked', function () {
    beforeEach(function render() {
      wrapper = shallow(<TodoList {...props} completeCount={2} />);
    });

    it('renders correctly', function () {
      expect(wrapper.find('.toggle-all')).to.be.checked();
    });
  });

  context('when loading', function () {
    beforeEach(function render() {
      wrapper = shallow(<TodoList {...props} isLoading />);
    });

    it('renders correctly', function () {
      expect(wrapper.find('.loading-indicator')).to.be.present();
    });
  });

  context('with no todos', function () {
    beforeEach(function render() {
      wrapper = shallow(<TodoList {...props} count={0} todos={[]} />);
    });

    it('renders correctly', function () {
      expect(wrapper.find('.todo-list').children()).to.have.length(0);
      // FIXME: expect(wrapper).not.to.have.descendants(Footer);
    });
  });
});
