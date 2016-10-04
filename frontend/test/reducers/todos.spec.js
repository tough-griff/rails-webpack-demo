import { List } from 'immutable';

import { behavesLikeReducer } from '../support/sharedBehaviors';
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

  behavesLikeReducer(todos, new List());

  context('with action type "ADD_TODO__END"', function () {
    const action = {
      type: 'ADD_TODO__END',
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
      expect(result).to.have.size(3);
      expect(result.last()).to.have.property('label', 'New');
    });
  });

  context('with action type "CLEAR_COMPLETE_TODOS__END"', function () {
    const action = {
      type: 'CLEAR_COMPLETE_TODOS__END',
      payload: {
        todos: [{
          id: 1,
        }],
      },
    };

    it('removes todos where isComplete = true', function () {
      const result = todos(state, action);
      expect(result).to.have.size(1);
      expect(result.every(todo => !todo.get('isComplete'))).to.be.true();
    });
  });

  context('with action type "DELETE_TODO__END"', function () {
    const action = {
      type: 'DELETE_TODO__END',
      payload: {
        todo: { id: 2 },
      },
    };

    it('removes the correct todo', function () {
      const result = todos(state, action);
      expect(result).to.have.size(1);
      expect(result.every(todo => todo.get('id') !== 2)).to.be.true();
    });
  });

  context('with action type "EDIT_TODO__END"', function () {
    const action = {
      type: 'EDIT_TODO__END',
      payload: {
        todo: {
          id: 2,
          label: 'New label',
        },
      },
    };

    it('modifies the correct todo', function () {
      const result = todos(state, action).find(todo => todo.get('id') === 2);
      expect(result).to.have.property('label', 'New label');
    });
  });


  context('with action type "FETCH_ALL_TODOS__END"', function () {
    const action = {
      type: 'FETCH_ALL_TODOS__END',
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
      expect(result).to.have.size(4);
      expect(result.every(todo => todo.get('label') === 'Fetched me!')).to.be.true();
    });
  });

  context('with action type "FETCH_TODO__END"', function () {
    context('when fetching a new todo', function () {
      const action = {
        type: 'FETCH_TODO__END',
        payload: { todo: { id: 3, label: 'Fetched me!' } },
      };

      it('correctly replaces the todo', function () {
        const result = todos(state, action);
        expect(result).to.have.size(3);
        expect(result.last()).to.have.property('label', 'Fetched me!');
      });
    });

    context('when fetching an existing todo', function () {
      const action = {
        type: 'FETCH_TODO__END',
        payload: { todo: { id: 2, label: 'Fetched me!' } },
      };

      it('correctly replaces the todo', function () {
        const result = todos(state, action);
        expect(result).to.have.size(2);
        expect(result.last()).to.have.property('label', 'Fetched me!');
      });
    });
  });

  context('with action type "MARK_ALL_TODOS__END"', function () {
    const action = {
      type: 'MARK_ALL_TODOS__END',
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
      expect(result.every(todo => todo.get('isComplete'))).to.be.true();
    });
  });

  context('with action type "MARK_TODO__END"', function () {
    const action = {
      type: 'MARK_TODO__END',
      payload: {
        todo: {
          id: 2,
          isComplete: true,
        },
      },
    };

    it('modifies the correct todo', function () {
      const result = todos(state, action).find(todo => todo.get('id') === 2);
      expect(result).to.have.property('isComplete', true);
    });
  });

  context('with action type "MOVE_TODO__END"', function () {
    const action = {
      type: 'MOVE_TODO__END',
      payload: {
        todos: [{ index: 2 }, { index: 1 }],
      },
    };

    it('modifies the todo list indices correctly', function () {
      const result = todos(state, action);
      expect(result.get(0)).to.have.property('index', 2);
      expect(result.get(1)).to.have.property('index', 1);
    });
  });
});
