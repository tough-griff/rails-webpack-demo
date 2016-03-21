import 'isomorphic-fetch';
import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import configureMockStore from '../support/configureMockStore';

import TodoActions from '../../src/actions/TodoActions';

describe('TodoActions', function () {
  const storeMock = configureMockStore({});

  afterEach(function resetMocks() {
    fetchMock.reset();
    storeMock.clearActions();
  });

  it('exposes an object', function () {
    expect(TodoActions).to.be.an('object');
  });

  describe('.addTodo()', function () {
    const label = 'fake todo';
    const subject = TodoActions.addTodo(label);
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

    it('dispatches the correct action', function (done) {
      storeMock.dispatch(subject).then(() => {
        expect(storeMock.getActions()).to.eql([action]);
        done();
      });
    });
  });

  describe('.clearCompleteTodos()', function () {
    const subject = TodoActions.clearCompleteTodos();
    const action = {
      type: 'CLEAR_COMPLETE_TODOS',
    };

    it('creates the correct action', function () {
      expect(subject).to.eql(action);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject);
      expect(storeMock.getActions()).to.eql([action]);
    });
  });

  describe('.deleteTodo()', function () {
    const id = 5;
    const subject = TodoActions.deleteTodo(id);
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

    it('dispatches the correct action', function (done) {
      storeMock.dispatch(subject).then(() => {
        expect(storeMock.getActions()).to.eql([action]);
        done();
      });
    });
  });

  describe('.editTodo()', function () {
    const id = 5;
    const label = 'fake todo';
    const subject = TodoActions.editTodo(id, label);
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

    it('dispatches the correct action', function (done) {
      storeMock.dispatch(subject).then(() => {
        expect(storeMock.getActions()).to.eql([action]);
        done();
      });
    });
  });

  describe('.fetchAllTodos()', function () {
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];
    const subject = TodoActions.fetchAllTodos();
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

    it('dispatches the correct action', function (done) {
      storeMock.dispatch(subject).then(() => {
        expect(storeMock.getActions()).to.eql([action]);
        done();
      });
    });
  });

  describe('.markTodo()', function () {
    const id = 5;
    const isComplete = true;
    const subject = TodoActions.markTodo(id, isComplete);
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

    it('dispatches the correct action', function (done) {
      storeMock.dispatch(subject).then(() => {
        expect(storeMock.getActions()).to.eql([action]);
        done();
      });
    });
  });

  describe('.markAllTodos()', function () {
    const isComplete = true;
    const subject = TodoActions.markAllTodos(isComplete);
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: { isComplete },
    };

    it('creates the correct action', function () {
      expect(subject).to.eql(action);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject);
      expect(storeMock.getActions()).to.eql([action]);
    });
  });

  describe('.moveTodo()', function () {
    const at = 5;
    const to = 8;
    const subject = TodoActions.moveTodo(at, to);
    const action = {
      type: 'MOVE_TODO',
      payload: { at, to },
    };

    it('creates the correct action', function () {
      expect(subject).to.eql(action);
    });

    it('dispatches the correct action', function () {
      storeMock.dispatch(subject);
      expect(storeMock.getActions()).to.eql([action]);
    });
  });
});
