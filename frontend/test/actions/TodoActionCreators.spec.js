import 'isomorphic-fetch';
import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import configureMockStore from '../support/configureMockStore';

import TodoActionCreators from '../../js/actions/TodoActionCreators';

describe('TodoActionCreators', function () {
  const storeMock = configureMockStore({});

  // Shared behaviors between actions.
  function shouldBehaveLikeAction(endpoint) {
    it('returns a thunk', function () {
      expect(this.subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      this.subject();
      expect(fetchMock.called(endpoint)).to.be(true);
    });

    it('dispatches the correct action', function () {
      return storeMock.dispatch(this.subject).then(() => {
        expect(storeMock.getActions()[0]).to.eql(this.expectedAction);
      });
    });

    context('when receiving an error', function () {
      beforeEach(function mockApiResponse() {
        fetchMock.reMock(endpoint, { error: 'AN ERROR' });
      });

      it('dispatches the error', function () {
        return storeMock.dispatch(this.subject).then(() => {
          expect(storeMock.getActions()[0]).to.eql({
            type: this.expectedAction.type,
            payload: new Error('AN ERROR'),
            error: true,
          });
        });
      });
    });
  }

  before(function stubGetCSRFToken() {
    sinon.stub(document, 'getElementsByTagName').returns({
      'csrf-token': { content: 'FAKE_CSRF_TOKEN' },
    });
  });

  afterEach(function resetMocks() {
    fetchMock.reset();
    storeMock.clearActions();
  });

  after(function restoreGetCSRFToken() {
    document.getElementsByTagName.restore();
  });

  it('exposes an object', function () {
    expect(TodoActionCreators).to.be.an('object');
  });

  describe('.addTodo()', function () {
    beforeEach(function () {
      const label = 'label';
      this.subject = TodoActionCreators.addTodo(label);
      this.expectedAction = {
        type: 'ADD_TODO',
        payload: { todo: { label } },
      };

      fetchMock.reMock('/api/todos', 'POST', { todo: { label } });
    });

    shouldBehaveLikeAction('/api/todos');
  });

  describe('.clearCompleteTodos()', function () {
    beforeEach(function () {
      const todos = [{ id: 1 }, { id: 4 }];
      this.subject = TodoActionCreators.clearCompleteTodos();
      this.expectedAction = {
        type: 'CLEAR_COMPLETE_TODOS',
        payload: { todos },
      };

      fetchMock.reMock('/api/todos/clear_complete', 'DELETE', { todos });
    });

    shouldBehaveLikeAction('/api/todos/clear_complete');
  });

  describe('.deleteTodo()', function () {
    beforeEach(function () {
      const id = 5;
      this.subject = TodoActionCreators.deleteTodo(id);
      this.expectedAction = {
        type: 'DELETE_TODO',
        payload: { todo: { id } },
      };

      fetchMock.reMock(`/api/todos/${id}`, 'DELETE', { todo: { id } });
    });

    shouldBehaveLikeAction('/api/todos/5');
  });

  describe('.editTodo()', function () {
    beforeEach(function () {
      const id = 5;
      const label = 'fake todo';
      this.subject = TodoActionCreators.editTodo(id, label);
      this.expectedAction = {
        type: 'EDIT_TODO',
        payload: { todo: { id, label } },
      };

      fetchMock.reMock(`/api/todos/${id}`, 'PATCH', { todo: { id, label } });
    });

    shouldBehaveLikeAction('/api/todos/5');
  });

  describe('.fetchAllTodos()', function () {
    beforeEach(function () {
      const todos = [{ label: 'fake1' }, { label: 'fake2' }];
      this.subject = TodoActionCreators.fetchAllTodos();
      this.expectedAction = {
        type: 'FETCH_ALL_TODOS',
        payload: { todos },
      };

      fetchMock.reMock('/api/todos', 'GET', { todos });
    });

    shouldBehaveLikeAction('/api/todos');
  });

  describe('.markTodo()', function () {
    beforeEach(function () {
      const id = 5;
      const isComplete = true;
      this.subject = TodoActionCreators.markTodo(id, isComplete);
      this.expectedAction = {
        type: 'MARK_TODO',
        payload: { todo: { id, isComplete } },
      };

      fetchMock.reMock(`/api/todos/${id}`, 'PATCH', { todo: { id, isComplete } });
    });

    shouldBehaveLikeAction('/api/todos/5');
  });

  describe('.markAllTodos()', function () {
    beforeEach(function () {
      const isComplete = true;
      const todos = [{ isComplete: true }, { isComplete: true }];
      this.subject = TodoActionCreators.markAllTodos(isComplete);
      this.expectedAction = {
        type: 'MARK_ALL_TODOS',
        payload: { todos },
      };

      fetchMock.reMock('/api/todos/mark_all', 'PATCH', { todos });
    });

    shouldBehaveLikeAction('/api/todos/mark_all');
  });

  describe('.moveTodo()', function () {
    beforeEach(function () {
      const at = 5;
      const to = 8;
      const todos = [{ index: 8 }];
      this.subject = TodoActionCreators.moveTodo(at, to);
      this.expectedAction = {
        type: 'MOVE_TODO',
        payload: { todos },
      };

      fetchMock.reMock('/api/todos/move', 'PATCH', { todos });
    });

    shouldBehaveLikeAction('/api/todos/move');
  });
});
