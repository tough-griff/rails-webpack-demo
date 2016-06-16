import expect from 'expect.js';
import { List } from 'immutable';
import sinon from 'sinon';

import todos, { createTodoList } from '../../js/reducers/todos';

describe('todos()', function () {
  const state = createTodoList([{
    id: 1,
    index: 1,
    isComplete: true,
    label: 'Hello',
  }, {
    id: 2,
    index: 2,
    isComplete: false,
    label: 'World',
  }]);

  it('exposes a function', function () {
    expect(todos).to.be.a('function');
  });

  context('with no state argument', function () {
    const result = todos(undefined, {});

    it('returns the initial state', function () {
      expect(result).to.eql(new List());
    });
  });

  context('with no valid action type', function () {
    const result = todos(state, { type: 'NONSENSE' });

    it('passes state through', function () {
      expect(result).to.equal(state);
    });
  });

  /* eslint-disable no-console */
  context('when passed an error', function () {
    before(function stubConsoleError() {
      sinon.stub(console, 'error');
    });

    after(function restoreConsoleError() {
      console.error.restore();
    });

    it('passes state through and logs', function () {
      const result = todos(state, {
        type: 'ERROR_ACTION',
        error: true,
        payload: 'Error',
      });

      expect(result).to.equal(state);
      expect(console.error.calledOnce).to.be(true);
    });
  });
  /* eslint-enable no-console */

  context('with action type "ADD_TODO"', function () {
    const action = {
      type: 'ADD_TODO',
      payload: {
        todo: {
          id: 3,
          label: 'New',
          isComplete: false,
        },
      },
    };

    it('appends a new todo', function () {
      const result = todos(state, action);
      expect(result.size).to.equal(3);
      expect(result.last().get('label')).to.equal('New');
    });
  });

  context('with action type "CLEAR_COMPLETE_TODOS"', function () {
    const action = {
      type: 'CLEAR_COMPLETE_TODOS',
      payload: {
        todos: [{
          id: 1,
        }],
      },
    };

    it('removes todos where isComplete = true', function () {
      const result = todos(state, action);
      expect(result.size).to.equal(1);
      expect(result.every(todo => !todo.get('isComplete'))).to.be(true);
    });
  });

  context('with action type "DELETE_TODO"', function () {
    const action = {
      type: 'DELETE_TODO',
      payload: {
        todo: { id: 2 },
      },
    };

    it('removes the correct todo', function () {
      const result = todos(state, action);
      expect(result.size).to.equal(1);
      expect(result.every(todo => todo.get('id') !== 2)).to.be(true);
    });
  });

  context('with action type "EDIT_TODO"', function () {
    const action = {
      type: 'EDIT_TODO',
      payload: {
        todo: {
          id: 2,
          label: 'New label',
        },
      },
    };

    it('modifies the correct todo', function () {
      const result = todos(state, action).find(todo => todo.get('id') === 2);
      expect(result.get('label')).to.equal('New label');
    });
  });


  context('with action type "FETCH_ALL_TODOS"', function () {
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: {
        todos: [{
          label: 'Fetched me!',
        }, {
          label: 'Fetched me!',
        }, {
          label: 'Fetched me!',
        }, {
          label: 'Fetched me!',
        }],
      },
    };

    it('sets todoList to the new fetched todos', function () {
      const result = todos(state, action);
      expect(result.size).to.equal(4);
      expect(result.every(todo => todo.get('label') === 'Fetched me!')).to.be(true);
    });
  });

  context('with action type "MARK_ALL_TODOS"', function () {
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: {
        todos: [{
          isComplete: true,
        }, {
          isComplete: true,
        }, {
          isComplete: true,
        }, {
          isComplete: true,
        }],
      },
    };

    it('modifies all todos', function () {
      const result = todos(state, action);
      expect(result.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  context('with action type "MARK_TODO"', function () {
    const action = {
      type: 'MARK_TODO',
      payload: {
        todo: {
          id: 2,
          isComplete: true,
        },
      },
    };

    it('modifies the correct todo', function () {
      const result = todos(state, action).find(todo => todo.get('id') === 2);
      expect(result.get('isComplete')).to.be(true);
    });
  });

  context('with action type "MOVE_TODO"', function () {
    const action = {
      type: 'MOVE_TODO',
      payload: {
        todos: [{ index: 2 }, { index: 1 }],
      },
    };

    it('modifies the todo list indices correctly', function () {
      const result = todos(state, action);
      expect(result.get(0).get('index')).to.equal(2);
      expect(result.get(1).get('index')).to.equal(1);
    });
  });
});
