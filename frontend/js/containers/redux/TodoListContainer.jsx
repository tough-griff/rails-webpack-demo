import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoList from '../dnd/TodoList';
import * as TodoActionCreators from '../../actions/TodoActionCreators';
import { todoActionsShape, todoShape } from '../../shapes';

function mapStateToProps(state) {
  return {
    ...state.application.toJS(),
    todos: state.todos.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActionCreators, dispatch),
  };
}

class TodoListContainer extends Component {
  static propTypes = {
    actions: todoActionsShape.isRequired,
    isLoading: PropTypes.bool.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
    todosFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchAllTodos();
  }

  onToggleAll = (evt) => {
    this.props.actions.markAllTodos(evt.target.checked);
  };

  render() {
    const { actions, isLoading, todos, todosFilter } = this.props;

    return (
      <TodoList
        actions={actions}
        isLoading={isLoading}
        onToggleAll={this.onToggleAll}
        todos={todos}
        todosFilter={todosFilter}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);
