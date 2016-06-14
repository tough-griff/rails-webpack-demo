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
    const label = 'label';
    const url = '/api/todos';
    const subject = TodoActionCreators.addTodo(label);
    const expectedAction = {
      type: 'ADD_TODO',
      payload: { todo: { label } },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'POST', { todo: { label } });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.clearCompleteTodos()', function () {
    const todos = [{ id: 1 }, { id: 4 }];
    const url = '/api/todos/clear_complete';
    const subject = TodoActionCreators.clearCompleteTodos();
    const expectedAction = {
      type: 'CLEAR_COMPLETE_TODOS',
      payload: { todos },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'DELETE', { todos });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.deleteTodo()', function () {
    const id = 5;
    const url = `/api/todos/${id}`;
    const subject = TodoActionCreators.deleteTodo(id);
    const expectedAction = {
      type: 'DELETE_TODO',
      payload: { todo: { id } },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'DELETE', { todo: { id } });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.editTodo()', function () {
    const id = 5;
    const label = 'fake todo';
    const url = `/api/todos/${id}`;
    const subject = TodoActionCreators.editTodo(id, label);
    const expectedAction = {
      type: 'EDIT_TODO',
      payload: { todo: { id, label } },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'PATCH', { todo: { id, label } });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.fetchAllTodos()', function () {
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];
    const url = '/api/todos';
    const subject = TodoActionCreators.fetchAllTodos();
    const expectedAction = {
      type: 'FETCH_ALL_TODOS',
      payload: { todos },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'GET', { todos });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.markTodo()', function () {
    const id = 5;
    const isComplete = true;
    const url = `/api/todos/${id}`;
    const subject = TodoActionCreators.markTodo(id, isComplete);
    const expectedAction = {
      type: 'MARK_TODO',
      payload: { todo: { id, isComplete } },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'PATCH', { todo: { id, isComplete } });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.markAllTodos()', function () {
    const isComplete = true;
    const todos = [{ isComplete: true }, { isComplete: true }];
    const url = '/api/todos/mark_all';
    const subject = TodoActionCreators.markAllTodos(isComplete);
    const expectedAction = {
      type: 'MARK_ALL_TODOS',
      payload: { todos },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'PATCH', { todos });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });

  describe('.moveTodo()', function () {
    const at = 5;
    const to = 8;
    const todos = [{ index: 8 }, { index: 9 }];
    const url = '/api/todos/move';
    const subject = TodoActionCreators.moveTodo(at, to);
    const expectedAction = {
      type: 'MOVE_TODO',
      payload: { todos },
    };

    before(function stubApi() {
      fetchMock.reMock(url, 'PATCH', { todos });
    });

    behavesLikeAsyncAction(subject, url, expectedAction);
  });
});
