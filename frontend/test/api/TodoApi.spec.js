import { behavesLikeApiCall } from '../support/sharedBehaviors';
import { withMoxios, withMockedUrl } from '../support/sharedContexts';
import Api from '../../js/api/TodoApi';
import client from '../../js/utils/apiClient';

describe('TodoApi', function () {
  withMoxios(client);

  describe('.index()', function () {
    const url = '/todos';
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];

    withMockedUrl(url, { response: { todos } });

    behavesLikeApiCall(Api.index).returning(todos);
  });

  describe('.create()', function () {
    const url = '/todos';
    const todo = { label: 'fake1' };

    withMockedUrl(url, { response: { todo } });

    behavesLikeApiCall(Api.create, todo).returning(todo);
  });

  describe('.show()', function () {
    const url = '/todos/4';
    const todo = { id: 4 };

    withMockedUrl(url, { response: { todo } });

    behavesLikeApiCall(Api.show, 4).returning(todo);
  });

  describe('.update()', function () {
    const url = '/todos/4';
    const todo = { id: 4, label: 'new label' };

    withMockedUrl(url, { response: { todo } });

    behavesLikeApiCall(Api.update, 4, { label: 'new label' }).returning(todo);
  });

  describe('.destroy()', function () {
    const url = '/todos/4';
    const todo = { id: 4 };

    withMockedUrl(url, { response: { todo } });

    behavesLikeApiCall(Api.destroy, 4).returning(todo);
  });

  describe('.markAll()', function () {
    const url = '/todos/mark_all';
    const todos = [{ complete: true }, { complete: true }];

    withMockedUrl(url, { response: { todos } });

    behavesLikeApiCall(Api.markAll, true).returning(todos);
  });

  describe('.move()', function () {
    const url = '/todos/move';
    const todos = [{ index: 2 }, { index: 1 }];

    withMockedUrl(url, { response: { todos } });

    behavesLikeApiCall(Api.move, 1, 2).returning(todos);
  });

  describe('.clearComplete()', function () {
    const url = '/todos/clear_complete';
    const todos = [{ label: 'fake1', complete: false }];

    withMockedUrl(url, { response: { todos } });

    behavesLikeApiCall(Api.clearComplete).returning(todos);
  });
});
