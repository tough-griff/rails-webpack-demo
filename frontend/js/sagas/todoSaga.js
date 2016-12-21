import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import * as Actions from '../actions/constants';
import Api from '../api/TodoApi';

export function* addTodo({ payload }) {
  const { label } = payload;
  try {
    const todo = yield call(Api.create, { label });
    yield put({ type: Actions.ADD_TODO__END, payload: { todo } });
  } catch (error) {
    yield put({ type: Actions.ADD_TODO__ERR, payload: error, error: true });
  }
}

export function* clearCompleteTodos(_action) {
  try {
    const todos = yield call(Api.clearComplete);
    yield put({ type: Actions.CLEAR_COMPLETE_TODOS__END, payload: { todos } });
  } catch (error) {
    yield put({ type: Actions.CLEAR_COMPLETE_TODOS__ERR, payload: error, error: true });
  }
}

export function* deleteTodo({ payload }) {
  try {
    const todo = yield call(Api.destroy, payload.id);
    yield put({ type: Actions.DELETE_TODO__END, payload: { todo } });
  } catch (error) {
    yield put({ type: Actions.DELETE_TODO__ERR, payload: error, error: true });
  }
}

export function* editTodo({ payload }) {
  const { id, label } = payload;
  try {
    const todo = yield call(Api.update, id, { label });
    yield put({ type: Actions.EDIT_TODO__END, payload: { todo } });
  } catch (error) {
    yield put({ type: Actions.EDIT_TODO__ERR, payload: error, error: true });
  }
}

export function* fetchAllTodos(_action) {
  try {
    const todos = yield call(Api.index);
    yield put({ type: Actions.FETCH_ALL_TODOS__END, payload: { todos } });
  } catch (error) {
    yield put({ type: Actions.FETCH_ALL_TODOS__ERR, payload: error, error: true });
  }
}

export function* fetchTodo({ payload }) {
  try {
    const todo = yield call(Api.show, payload.id);
    yield put({ type: Actions.FETCH_TODO__END, payload: { todo } });
  } catch (error) {
    yield put({ type: Actions.FETCH_TODO__ERR, payload: error, error: true });
  }
}

export function* markAllTodos({ payload }) {
  try {
    const todos = yield call(Api.markAll, payload.complete);
    yield put({ type: Actions.MARK_ALL_TODOS__END, payload: { todos } });
  } catch (error) {
    yield put({ type: Actions.MARK_ALL_TODOS__ERR, payload: error, error: true });
  }
}

export function* markTodo({ payload }) {
  const { id, complete } = payload;
  try {
    const todo = yield call(Api.update, id, { complete });
    yield put({ type: Actions.MARK_TODO__END, payload: { todo } });
  } catch (error) {
    yield put({ type: Actions.MARK_TODO__ERR, payload: error, error: true });
  }
}

export function* moveTodo({ payload }) {
  const { at, to } = payload;
  try {
    const todos = yield call(Api.move, at, to);
    yield put({ type: Actions.MOVE_TODO__END, payload: { todos } });
  } catch (error) {
    yield put({ type: Actions.MOVE_TODO__ERR, payload: error, error: true });
  }
}

export default function* todoSaga() {
  yield takeEvery(Actions.ADD_TODO, addTodo);
  yield takeEvery(Actions.CLEAR_COMPLETE_TODOS, clearCompleteTodos);
  yield takeEvery(Actions.DELETE_TODO, deleteTodo);
  yield takeEvery(Actions.EDIT_TODO, editTodo);
  yield takeLatest(Actions.FETCH_ALL_TODOS, fetchAllTodos);
  yield takeLatest(Actions.FETCH_TODO, fetchTodo);
  yield takeLatest(Actions.MARK_ALL_TODOS, markAllTodos);
  yield takeEvery(Actions.MARK_TODO, markTodo);
  yield takeEvery(Actions.MOVE_TODO, moveTodo);
}
