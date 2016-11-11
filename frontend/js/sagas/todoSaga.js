import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import Api from '../api/TodoApi';

export function* addTodo({ payload }) {
  const { label } = payload;
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

export function* deleteTodo({ payload }) {
  try {
    const todo = yield call(Api.destroy, payload.id);
    yield put({ type: 'DELETE_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'DELETE_TODO__ERR', payload: error, error: true });
  }
}

export function* editTodo({ payload }) {
  const { id, label } = payload;
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

export function* fetchTodo({ payload }) {
  try {
    const todo = yield call(Api.show, payload.id);
    yield put({ type: 'FETCH_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'FETCH_TODO__ERR', payload: error, error: true });
  }
}

export function* markAllTodos({ payload }) {
  try {
    const todos = yield call(Api.markAll, payload.complete);
    yield put({ type: 'MARK_ALL_TODOS__END', payload: { todos } });
  } catch (error) {
    yield put({ type: 'MARK_ALL_TODOS__ERR', payload: error, error: true });
  }
}

export function* markTodo({ payload }) {
  const { id, complete } = payload;
  try {
    const todo = yield call(Api.update, id, { complete });
    yield put({ type: 'MARK_TODO__END', payload: { todo } });
  } catch (error) {
    yield put({ type: 'MARK_TODO__ERR', payload: error, error: true });
  }
}

export function* moveTodo({ payload }) {
  const { at, to } = payload;
  try {
    const todos = yield call(Api.move, at, to);
    yield put({ type: 'MOVE_TODO__END', payload: { todos } });
  } catch (error) {
    yield put({ type: 'MOVE_TODO__ERR', payload: error, error: true });
  }
}

export default function* todoSaga() {
  yield takeEvery('ADD_TODO', addTodo);
  yield takeEvery('CLEAR_COMPLETE_TODOS', clearCompleteTodos);
  yield takeEvery('DELETE_TODO', deleteTodo);
  yield takeEvery('EDIT_TODO', editTodo);
  yield takeLatest('FETCH_ALL_TODOS', fetchAllTodos);
  yield takeLatest('FETCH_TODO', fetchTodo);
  yield takeLatest('MARK_ALL_TODOS', markAllTodos);
  yield takeEvery('MARK_TODO', markTodo);
  yield takeEvery('MOVE_TODO', moveTodo);
}
