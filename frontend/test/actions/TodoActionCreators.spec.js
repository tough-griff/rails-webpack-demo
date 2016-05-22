import 'isomorphic-fetch';
import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import configureMockStore from '../support/configureMockStore';

import TodoActionCreators from '../../js/actions/TodoActionCreators';

describe('TodoActionCreators', function () {
  const storeMock = configureMockStore({});

  before(function stubGetCSRFToken() {
    document.getElementsByTagName = (_tagName) => ({
      'csrf-token': { content: 'FAKE_CSRF_TOKEN' },
    });
  });

  afterEach(function resetMocks() {
    fetchMock.reset();
    storeMock.clearActions();
  });

  it('exposes an object', function () {
    expect(TodoActionCreators).to.be.an('object');
  });

  describe('.addTodo()', function () {
    const label = 'fake todo';
    const subject = TodoActionCreators.addTodo(label);
    const action = {
      type: 'ADD_TODO',
      payload: { todo: { label } },
    };

    before(function mockApi() {
      fetchMock.reMock('/api/todos', 'POST', { todo: { label } });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos')).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.clearCompleteTodos()', function () {
    const todos = [{ id: 1 }, { id: 4 }];
    const subject = TodoActionCreators.clearCompleteTodos();
    const action = {
      type: 'CLEAR_COMPLETE_TODOS',
      payload: { todos },
    };

    before(function mockApi() {
      fetchMock.reMock('/api/todos/clear_complete', 'DELETE', { todos });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos/clear_complete')).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.deleteTodo()', function () {
    const id = 5;
    const subject = TodoActionCreators.deleteTodo(id);
    const action = {
      type: 'DELETE_TODO',
      payload: { todo: { id } },
    };

    before(function mockApi() {
      fetchMock.reMock(`/api/todos/${id}`, 'DELETE', { todo: { id } });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.editTodo()', function () {
    const id = 5;
    const label = 'fake todo';
    const subject = TodoActionCreators.editTodo(id, label);
    const action = {
      type: 'EDIT_TODO',
      payload: { todo: { id, label } },
    };

    before(function mockApi() {
      fetchMock.reMock(`/api/todos/${id}`, 'PATCH', { todo: { id, label } });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.fetchAllTodos()', function () {
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];
    const subject = TodoActionCreators.fetchAllTodos();
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: { todos },
    };

    before(function mockApi() {
      fetchMock.reMock('/api/todos', 'GET', { todos });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos')).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.markTodo()', function () {
    const id = 5;
    const isComplete = true;
    const subject = TodoActionCreators.markTodo(id, isComplete);
    const action = {
      type: 'MARK_TODO',
      payload: { todo: { id, isComplete } },
    };

    before(function mockApi() {
      fetchMock.reMock(`/api/todos/${id}`, 'PATCH', { todo: { id, isComplete } });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.markAllTodos()', function () {
    const isComplete = true;
    const todos = [{ isComplete: true }, { isComplete: true }];
    const subject = TodoActionCreators.markAllTodos(isComplete);
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: { todos },
    };

    before(function mockApi() {
      fetchMock.reMock('/api/todos/mark_all', 'PATCH', { todos });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos/mark_all')).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });

  describe('.moveTodo()', function () {
    const at = 5;
    const to = 8;
    const todos = [{ index: 8 }];
    const subject = TodoActionCreators.moveTodo(at, to);
    const action = {
      type: 'MOVE_TODO',
      payload: { todos },
    };

    before(function mockApi() {
      fetchMock.reMock('/api/todos/move', 'PATCH', { todos });
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos/move')).to.be(true);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject).then(() =>
        expect(storeMock.getActions()).to.eql([action])
      );
    });
  });
});
