import {
  getFilteredTodos, getCount, getCompleteCount, getMaxIndex,
} from '../../js/selectors/todoSelectors';

describe('todos selectors', function () {
  const todos = [{
    isComplete: false,
    index: 1,
  }, {
    isComplete: true,
    index: 3,
  }];

  const state = {
    get: sinon.stub().withArgs('todos').returns({
      toJS: sinon.stub().returns(todos),
    }),
  };

  describe('getFilteredTodos()', function () {
    context('when filter = all', function () {
      const props = { todosFilter: 'all' };

      it('returns the expected results', function () {
        expect(getFilteredTodos(state, props)).to.eql(todos);
      });
    });

    context('when filter = active', function () {
      const props = { todosFilter: 'active' };

      it('returns the expected results', function () {
        expect(getFilteredTodos(state, props)).to.eql([todos[0]]);
      });
    });

    context('when filter = completed', function () {
      const props = { todosFilter: 'completed' };

      it('returns the expected results', function () {
        expect(getFilteredTodos(state, props)).to.eql([todos[1]]);
      });
    });
  });

  describe('getCount()', function () {
    it('returns the expected results', function () {
      expect(getCount(state)).to.equal(2);
    });
  });

  describe('getCompleteCount()', function () {
    it('returns the expected results', function () {
      expect(getCompleteCount(state)).to.equal(1);
    });
  });

  describe('getMaxIndex()', function () {
    it('returns the expected results', function () {
      expect(getMaxIndex(state)).to.equal(3);
    });

    context('with an empty todo list', function () {
      const emptyState = {
        get: sinon.stub().withArgs('todos').returns({
          toJS: sinon.stub().returns([]),
        }),
      };

      it('returns the expected results', function () {
        expect(getMaxIndex(emptyState)).to.equal(0);
      });
    });
  });
});
