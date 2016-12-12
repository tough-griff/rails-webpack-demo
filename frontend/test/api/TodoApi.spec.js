import moxios from 'moxios';

import { behavesLikeApiCall } from '../support/sharedBehaviors';
import { withMoxios } from '../support/sharedContexts';
import Api from '../../js/api/TodoApi';
import client from '../../js/utils/apiClient';

describe('TodoApi', function () {
  withMoxios(client);

  describe('.index()', function () {
    const url = '/api/todos';
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todos } });
    });

    behavesLikeApiCall(Api.index).returning(todos);
  });

  describe('.create()', function () {
    const url = '/api/todos';
    const todo = { label: 'fake1' };

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todo } });
    });

    behavesLikeApiCall(Api.create, todo).returning(todo);
  });

  describe('.show()', function () {
    const url = '/api/todos/4';
    const todo = { id: 4 };

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todo } });
    });

    behavesLikeApiCall(Api.show, 4).returning(todo);
  });

  describe('.update()', function () {
    const url = '/api/todos/4';
    const todo = { id: 4, label: 'new label' };

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todo } });
    });

    behavesLikeApiCall(Api.update, 4, { label: 'new label' }).returning(todo);
  });

  describe('.destroy()', function () {
    const url = '/api/todos/4';
    const todo = { id: 4 };

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todo } });
    });

    behavesLikeApiCall(Api.destroy, 4).returning(todo);
  });

  describe('.markAll()', function () {
    const url = '/api/todos/mark_all';
    const todos = [{ complete: true }, { complete: true }];

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todos } });
    });

    behavesLikeApiCall(Api.markAll, true).returning(todos);
  });

  describe('.move()', function () {
    const url = '/api/todos/move';
    const todos = [{ index: 2 }, { index: 1 }];

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todos } });
    });

    behavesLikeApiCall(Api.move, 1, 2).returning(todos);
  });

  describe('.clearComplete()', function () {
    const url = '/api/todos/clear_complete';
    const todos = [{ label: 'fake1', complete: false }];

    before(function stubApi() {
      moxios.stubRequest(url, { response: { todos } });
    });

    behavesLikeApiCall(Api.clearComplete).returning(todos);
  });
});
