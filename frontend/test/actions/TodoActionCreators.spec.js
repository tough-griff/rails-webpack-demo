import { behavesLikeActionCreator } from '../support/sharedBehaviors';
import * as Actions from '../../js/actions/constants';
import * as TodoActionCreators from '../../js/actions/TodoActionCreators';

describe('TodoActionCreators', function () {
  describe('addTodo()', function () {
    const label = 'label';
    const subject = TodoActionCreators.addTodo(label);
    const expectedAction = {
      type: Actions.ADD_TODO,
      payload: { label },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('clearCompleteTodos()', function () {
    const subject = TodoActionCreators.clearCompleteTodos();
    const expectedAction = {
      type: Actions.CLEAR_COMPLETE_TODOS,
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('deleteTodo()', function () {
    const id = 5;
    const subject = TodoActionCreators.deleteTodo(id);
    const expectedAction = {
      type: Actions.DELETE_TODO,
      payload: { id },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('editTodo()', function () {
    const id = 5;
    const label = 'fake todo';
    const subject = TodoActionCreators.editTodo(id, label);
    const expectedAction = {
      type: Actions.EDIT_TODO,
      payload: { id, label },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('fetchAllTodos()', function () {
    const subject = TodoActionCreators.fetchAllTodos();
    const expectedAction = {
      type: Actions.FETCH_ALL_TODOS,
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('fetchTodo()', function () {
    const id = 5;
    const subject = TodoActionCreators.fetchTodo(id);
    const expectedAction = {
      type: Actions.FETCH_TODO,
      payload: { id },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('markAllTodos()', function () {
    const complete = true;
    const subject = TodoActionCreators.markAllTodos(complete);
    const expectedAction = {
      type: Actions.MARK_ALL_TODOS,
      payload: { complete },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('markTodo()', function () {
    const id = 5;
    const complete = true;
    const subject = TodoActionCreators.markTodo(id, complete);
    const expectedAction = {
      type: Actions.MARK_TODO,
      payload: { id, complete },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('moveTodo()', function () {
    const at = 5;
    const to = 8;
    const subject = TodoActionCreators.moveTodo(at, to);
    const expectedAction = {
      type: Actions.MOVE_TODO,
      payload: { at, to },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });
});
