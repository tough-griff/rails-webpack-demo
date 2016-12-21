import { call, put } from 'redux-saga/effects';

import todoSaga, {
  addTodo,
  clearCompleteTodos,
  deleteTodo,
  editTodo,
  fetchAllTodos,
  fetchTodo,
  markAllTodos,
  markTodo,
  moveTodo,
} from '../../js/sagas/todoSaga';
import * as Actions from '../../js/actions/constants';
import Api from '../../js/api/TodoApi';

describe('todoSaga() handlers', function () {
  describe('addTodo()', function () {
    const generator = addTodo({ payload: { label: 'label' } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.create, { label: 'label' })
      );
    });

    it('fires the correct action on success', function () {
      const todo = {};
      expect(generator.next(todo).value).to.eql(
        put({ type: Actions.ADD_TODO__END, payload: { todo } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.ADD_TODO__ERR, payload: error, error: true })
      );
    });
  });

  describe('clearCompleteTodos()', function () {
    const generator = clearCompleteTodos();

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.clearComplete)
      );
    });

    it('fires the correct action on success', function () {
      const todos = [];
      expect(generator.next(todos).value).to.eql(
        put({ type: Actions.CLEAR_COMPLETE_TODOS__END, payload: { todos } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.CLEAR_COMPLETE_TODOS__ERR, payload: error, error: true })
      );
    });
  });

  describe('deleteTodo()', function () {
    const generator = deleteTodo({ payload: { id: 5 } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.destroy, 5)
      );
    });

    it('fires the correct action on success', function () {
      const todo = {};
      expect(generator.next(todo).value).to.eql(
        put({ type: Actions.DELETE_TODO__END, payload: { todo } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.DELETE_TODO__ERR, payload: error, error: true })
      );
    });
  });

  describe('editTodo()', function () {
    const generator = editTodo({ payload: { id: 5, label: 'new label' } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.update, 5, { label: 'new label' })
      );
    });

    it('fires the correct action on success', function () {
      const todo = {};
      expect(generator.next(todo).value).to.eql(
        put({ type: Actions.EDIT_TODO__END, payload: { todo } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.EDIT_TODO__ERR, payload: error, error: true })
      );
    });
  });

  describe('fetchAllTodos()', function () {
    const generator = fetchAllTodos({});

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.index)
      );
    });

    it('fires the correct action on success', function () {
      const todos = [];
      expect(generator.next(todos).value).to.eql(
        put({ type: Actions.FETCH_ALL_TODOS__END, payload: { todos } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.FETCH_ALL_TODOS__ERR, payload: error, error: true })
      );
    });
  });

  describe('fetchTodo()', function () {
    const generator = fetchTodo({ payload: { id: 5 } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.show, 5)
      );
    });

    it('fires the correct action on success', function () {
      const todo = {};
      expect(generator.next(todo).value).to.eql(
        put({ type: Actions.FETCH_TODO__END, payload: { todo } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.FETCH_TODO__ERR, payload: error, error: true })
      );
    });
  });

  describe('markAllTodos()', function () {
    const generator = markAllTodos({ payload: { complete: true } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.markAll, true)
      );
    });

    it('fires the correct action on success', function () {
      const todos = [];
      expect(generator.next(todos).value).to.eql(
        put({ type: Actions.MARK_ALL_TODOS__END, payload: { todos } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.MARK_ALL_TODOS__ERR, payload: error, error: true })
      );
    });
  });

  describe('markTodo()', function () {
    const generator = markTodo({ payload: { id: 5, complete: true } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.update, 5, { complete: true })
      );
    });

    it('fires the correct action on success', function () {
      const todo = {};
      expect(generator.next(todo).value).to.eql(
        put({ type: Actions.MARK_TODO__END, payload: { todo } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.MARK_TODO__ERR, payload: error, error: true })
      );
    });
  });

  describe('moveTodo()', function () {
    const generator = moveTodo({ payload: { at: 2, to: 1 } });

    it('calls the fetch API', function () {
      expect(generator.next().value).to.eql(
        call(Api.move, 2, 1)
      );
    });

    it('fires the correct action on success', function () {
      const todos = [];
      expect(generator.next(todos).value).to.eql(
        put({ type: Actions.MOVE_TODO__END, payload: { todos } })
      );
    });

    it('fires the correct action on error', function () {
      const error = {};
      expect(generator.throw(error).value).to.eql(
        put({ type: Actions.MOVE_TODO__ERR, payload: error, error: true })
      );
    });
  });

  describe('todoSaga()', function () {
    const generator = todoSaga();

    it('forks the correct action handlers', function () {
      expect(generator.next().value.name).to.eql(
        `takeEvery(${Actions.ADD_TODO}, addTodo)`
      );
      expect(generator.next().value.name).to.eql(
        `takeEvery(${Actions.CLEAR_COMPLETE_TODOS}, clearCompleteTodos)`
      );
      expect(generator.next().value.name).to.eql(
        `takeEvery(${Actions.DELETE_TODO}, deleteTodo)`
      );
      expect(generator.next().value.name).to.eql(
        `takeEvery(${Actions.EDIT_TODO}, editTodo)`
      );
      expect(generator.next().value.name).to.eql(
        `takeLatest(${Actions.FETCH_ALL_TODOS}, fetchAllTodos)`
      );
      expect(generator.next().value.name).to.eql(
        `takeLatest(${Actions.FETCH_TODO}, fetchTodo)`
      );
      expect(generator.next().value.name).to.eql(
        `takeLatest(${Actions.MARK_ALL_TODOS}, markAllTodos)`
      );
      expect(generator.next().value.name).to.eql(
        `takeEvery(${Actions.MARK_TODO}, markTodo)`
      );
      expect(generator.next().value.name).to.eql(
        `takeEvery(${Actions.MOVE_TODO}, moveTodo)`
      );
    });
  });
});
