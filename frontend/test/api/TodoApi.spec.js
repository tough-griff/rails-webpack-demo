import fetchMock from 'fetch-mock';

import { behavesLikeApiClient } from '../support/sharedBehaviors';
import Api from '../../js/api/TodoApi';

const headers = { 'Content-Type': 'application/json' };

describe('TodoApi', function () {
  before(function stubGetElementsByTagName() {
    sinon.stub(document, 'getElementsByTagName').returns({
      'csrf-token': { content: 'FAKE_CSRF_TOKEN' },
    });
  });

  after(function restoreGetElementsByTagName() {
    document.getElementsByTagName.restore();
  });

  describe('.index()', function () {
    const url = '/api/todos';
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];

    before(function stubApi() {
      fetchMock.restore().get(url, { body: { todos }, headers });
    });

    behavesLikeApiClient(Api.index, [], url, todos);
  });

  describe('.create()', function () {
    const url = '/api/todos';
    const todo = { label: 'fake1' };

    before(function stubApi() {
      fetchMock.restore().post(url, { body: { todo }, headers });
    });

    behavesLikeApiClient(Api.create, [todo], url, todo);
  });

  describe('.show()', function () {
    const url = '/api/todos/4';
    const todo = { id: 4 };

    before(function stubApi() {
      fetchMock.restore().get(url, { body: { todo }, headers });
    });

    behavesLikeApiClient(Api.show, [4], url, todo);
  });

  describe('.update()', function () {
    const url = '/api/todos/4';
    const todo = { id: 4, label: 'new label' };

    before(function stubApi() {
      fetchMock.restore().patch(url, { body: { todo }, headers });
    });

    behavesLikeApiClient(Api.update, [4, { label: 'new label' }], url, todo);
  });

  describe('.destroy()', function () {
    const url = '/api/todos/4';
    const todo = { id: 4 };

    before(function stubApi() {
      fetchMock.restore().delete(url, { body: { todo }, headers });
    });

    behavesLikeApiClient(Api.destroy, [4], url, todo);
  });

  describe('.markAll()', function () {
    const url = '/api/todos/mark_all';
    const todos = [{ complete: true }, { complete: true }];

    before(function stubApi() {
      fetchMock.restore().patch(url, { body: { todos }, headers });
    });

    behavesLikeApiClient(Api.markAll, [true], url, todos);
  });

  describe('.move()', function () {
    const url = '/api/todos/move';
    const todos = [{ index: 2 }, { index: 1 }];

    before(function stubApi() {
      fetchMock.restore().patch(url, { body: { todos }, headers });
    });

    behavesLikeApiClient(Api.move, [1, 2], url, todos);
  });

  describe('.clearComplete()', function () {
    const url = '/api/todos/clear_complete';
    const todos = [{ label: 'fake1', complete: false }];

    before(function stubApi() {
      fetchMock.restore().delete(url, { body: { todos }, headers });
    });

    behavesLikeApiClient(Api.clearComplete, [], url, todos);
  });
});
