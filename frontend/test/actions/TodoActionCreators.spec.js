import fetchMock from 'fetch-mock';

import mockStore from '../support/mockStore';
import { behavesLikeActionCreator } from '../support/sharedBehaviors';
import * as TodoActionCreators from '../../js/actions/TodoActionCreators';

describe('TodoActionCreators', function () {
  before(function stubGetElementsByTagName() {
    sinon.stub(document, 'getElementsByTagName').returns({
      'csrf-token': { content: 'FAKE_CSRF_TOKEN' },
    });
  });

  afterEach(function resetMocks() {
    fetchMock.reset();
    mockStore.clearActions();
  });

  after(function restoreGetElementsByTagName() {
    document.getElementsByTagName.restore();
  });

  it('exposes an object', function () {
    expect(TodoActionCreators).to.be.an('object');
  });

  describe('.addTodo()', function () {
    const label = 'label';
    const subject = TodoActionCreators.addTodo(label);
    const expectedAction = {
      type: 'ADD_TODO',
      payload: { label },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.clearCompleteTodos()', function () {
    const subject = TodoActionCreators.clearCompleteTodos();
    const expectedAction = {
      type: 'CLEAR_COMPLETE_TODOS',
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.deleteTodo()', function () {
    const id = 5;
    const subject = TodoActionCreators.deleteTodo(id);
    const expectedAction = {
      type: 'DELETE_TODO',
      payload: { id },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.editTodo()', function () {
    const id = 5;
    const label = 'fake todo';
    const subject = TodoActionCreators.editTodo(id, label);
    const expectedAction = {
      type: 'EDIT_TODO',
      payload: { id, label },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.fetchAllTodos()', function () {
    const subject = TodoActionCreators.fetchAllTodos();
    const expectedAction = {
      type: 'FETCH_ALL_TODOS',
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.fetchTodo()', function () {
    const id = 5;
    const subject = TodoActionCreators.fetchTodo(id);
    const expectedAction = {
      type: 'FETCH_TODO',
      payload: { id },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.markAllTodos()', function () {
    const complete = true;
    const subject = TodoActionCreators.markAllTodos(complete);
    const expectedAction = {
      type: 'MARK_ALL_TODOS',
      payload: { complete },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.markTodo()', function () {
    const id = 5;
    const complete = true;
    const subject = TodoActionCreators.markTodo(id, complete);
    const expectedAction = {
      type: 'MARK_TODO',
      payload: { id, complete },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('.moveTodo()', function () {
    const at = 5;
    const to = 8;
    const subject = TodoActionCreators.moveTodo(at, to);
    const expectedAction = {
      type: 'MOVE_TODO',
      payload: { at, to },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });
});
