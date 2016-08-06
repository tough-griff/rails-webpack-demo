import { takeLatest } from 'redux-saga';
import { call, fork, put } from 'redux-saga/effects';

import Api from '../api/TodoApi';

export function* addTodo(action) {
  const { label } = action.payload;
  try {
    const todo = yield call(Api.create, { label });
    yield put({ type: 'ADD_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'ADD_TODO__ERR', payload: error, error: true });
  }
}

export function* clearCompleteTodos(_action) {
  try {
    const todos = yield call(Api.clearComplete);
    yield put({ type: 'CLEAR_COMPLETE_TODOS__END', payload: { todos } });
  } catch (error) {
    yield put({ type: 'CLEAR_COMPLETE_TODOS__ERR', payload: error, error: true });
  }
}

export function* deleteTodo(action) {
  try {
    const todo = yield call(Api.destroy, action.payload.id);
    yield put({ type: 'DELETE_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'DELETE_TODO__ERR', payload: error, error: true });
  }
}

export function* editTodo(action) {
  const { id, label } = action.payload;
  try {
    const todo = yield call(Api.update, id, { label });
    yield put({ type: 'EDIT_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'EDIT_TODO__ERR', payload: error, error: true });
  }
}

export function* fetchAllTodos(_action) {
  try {
    const todos = yield call(Api.index);
    yield put({ type: 'FETCH_ALL_TODOS__END', payload: { todos } });
  } catch (error) {
    yield put({ type: 'FETCH_ALL_TODOS__ERR', payload: error, error: true });
  }
}

export function* fetchTodo(action) {
  try {
    const todo = yield call(Api.show, action.payload.id);
    yield put({ type: 'FETCH_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'FETCH_TODO__ERR', payload: error, error: true });
  }
}

export function* markAllTodos(action) {
  try {
    const todos = yield call(Api.markAll, action.payload.complete);
    yield put({ type: 'MARK_ALL_TODOS__END', payload: { todos } });
  } catch (error) {
    yield put({ type: 'MARK_ALL_TODOS__ERR', payload: error, error: true });
  }
}

export function* markTodo(action) {
  const { id, complete } = action.payload;
  try {
    const todo = yield call(Api.update, id, { complete });
    yield put({ type: 'MARK_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'MARK_TODO__ERR', payload: error, error: true });
  }
}

export function* moveTodo(action) {
  const { at, to } = action.payload;
  try {
    const todos = yield call(Api.move, at, to);
    yield put({ type: 'MOVE_TODO__END', payload: { todos } });
  } catch (error) {
    yield put({ type: 'MOVE_TODO__ERR', payload: error, error: true });
  }
}

export default function* todoSaga() {
  yield fork(takeLatest, 'ADD_TODO', addTodo);
  yield fork(takeLatest, 'CLEAR_COMPLETE_TODOS', clearCompleteTodos);
  yield fork(takeLatest, 'DELETE_TODO', deleteTodo);
  yield fork(takeLatest, 'EDIT_TODO', editTodo);
  yield fork(takeLatest, 'FETCH_ALL_TODOS', fetchAllTodos);
  yield fork(takeLatest, 'FETCH_TODO', fetchTodo);
  yield fork(takeLatest, 'MARK_ALL_TODOS', markAllTodos);
  yield fork(takeLatest, 'MARK_TODO', markTodo);
  yield fork(takeLatest, 'MOVE_TODO', moveTodo);
}
