import 'isomorphic-fetch';
import expect from 'expect.js';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

import mockStore from '../support/mockStore';
import { behavesLikeAsyncAction } from '../support/sharedBehaviors';

import TodoActionCreators from '../../js/actions/TodoActionCreators';

describe('TodoActionCreators', function () {
  before(function stubGetCSRFToken() {
    sinon.stub(document, 'getElementsByTagName').returns({
      'csrf-token': { content: 'FAKE_CSRF_TOKEN' },
    });
  });

  afterEach(function resetMocks() {
    fetchMock.reset();
    mockStore.clearActions();
  });

  after(function restoreGetCSRFToken() {
    document.getElementsByTagName.restore();
  });

  it('exposes an object', function () {
    expect(TodoActionCreators).to.be.an('object');
  });

  describe('.addTodo()', function () {
    before(function setContext() {
      const label = 'label';
      this.url = '/api/todos';
      this.subject = TodoActionCreators.addTodo(label);
      this.expectedAction = {
        type: 'ADD_TODO',
        payload: { todo: { label } },
      };

      fetchMock.reMock(this.url, 'POST', { todo: { label } });
    });

    behavesLikeAsyncAction();
  });

  describe('.clearCompleteTodos()', function () {
    before(function setContext() {
      const todos = [{ id: 1 }, { id: 4 }];
      this.url = '/api/todos/clear_complete';
      this.subject = TodoActionCreators.clearCompleteTodos();
      this.expectedAction = {
        type: 'CLEAR_COMPLETE_TODOS',
        payload: { todos },
      };

      fetchMock.reMock(this.url, 'DELETE', { todos });
    });

    behavesLikeAsyncAction();
  });

  describe('.deleteTodo()', function () {
    before(function setContext() {
      const id = 5;
      this.url = `/api/todos/${id}`;
      this.subject = TodoActionCreators.deleteTodo(id);
      this.expectedAction = {
        type: 'DELETE_TODO',
        payload: { todo: { id } },
      };

      fetchMock.reMock(this.url, 'DELETE', { todo: { id } });
    });

    behavesLikeAsyncAction();
  });

  describe('.editTodo()', function () {
    before(function setContext() {
      const id = 5;
      const label = 'fake todo';
      this.url = `/api/todos/${id}`;
      this.subject = TodoActionCreators.editTodo(id, label);
      this.expectedAction = {
        type: 'EDIT_TODO',
        payload: { todo: { id, label } },
      };

      fetchMock.reMock(this.url, 'PATCH', { todo: { id, label } });
    });

    behavesLikeAsyncAction();
  });

  describe('.fetchAllTodos()', function () {
    before(function setContext() {
      const todos = [{ label: 'fake1' }, { label: 'fake2' }];
      this.url = '/api/todos';
      this.subject = TodoActionCreators.fetchAllTodos();
      this.expectedAction = {
        type: 'FETCH_ALL_TODOS',
        payload: { todos },
      };

      fetchMock.reMock(this.url, 'GET', { todos });
    });

    behavesLikeAsyncAction();
  });

  describe('.markTodo()', function () {
    before(function setContext() {
      const id = 5;
      const isComplete = true;
      this.url = `/api/todos/${id}`;
      this.subject = TodoActionCreators.markTodo(id, isComplete);
      this.expectedAction = {
        type: 'MARK_TODO',
        payload: { todo: { id, isComplete } },
      };

      fetchMock.reMock(this.url, 'PATCH', { todo: { id, isComplete } });
    });

    behavesLikeAsyncAction();
  });

  describe('.markAllTodos()', function () {
    before(function setContext() {
      const isComplete = true;
      const todos = [{ isComplete: true }, { isComplete: true }];
      this.url = '/api/todos/mark_all';
      this.subject = TodoActionCreators.markAllTodos(isComplete);
      this.expectedAction = {
        type: 'MARK_ALL_TODOS',
        payload: { todos },
      };

      fetchMock.reMock(this.url, 'PATCH', { todos });
    });

    behavesLikeAsyncAction();
  });

  describe('.moveTodo()', function () {
    before(function setContext() {
      const at = 5;
      const to = 8;
      const todos = [{ index: 8 }, { index: 9 }];
      this.url = '/api/todos/move';
      this.subject = TodoActionCreators.moveTodo(at, to);
      this.expectedAction = {
        type: 'MOVE_TODO',
        payload: { todos },
      };

      fetchMock.reMock(this.url, 'PATCH', { todos });
    });

    behavesLikeAsyncAction();
  });
});
