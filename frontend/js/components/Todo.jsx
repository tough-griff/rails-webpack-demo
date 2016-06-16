import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

import TextInput from './TextInput';

/**
 * Represents a single todo item in a todo list.
 */
export default class Todo extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    markTodo: PropTypes.func.isRequired,
    moveTodo: PropTypes.func.isRequired,
  };

  state = {
    isEditing: false,
  };

  onChange = (_evt) => {
    const { id, isComplete, markTodo } = this.props;

    markTodo(id, !isComplete);
  };

  onClick = (_evt) => {
    const { deleteTodo, id } = this.props;

    deleteTodo(id);
  };

  onDoubleClick = (_evt) => {
    this.setState({
      isEditing: true,
    });
  };

  onSave = (newLabel) => {
    const { deleteTodo, editTodo, id, label } = this.props;

    if (newLabel.length) {
      if (newLabel !== label) editTodo(id, newLabel);
    } else {
      deleteTodo(id);
    }

    this.setState({
      isEditing: false,
    });
  };

  renderInput() {
    if (!this.state.isEditing) return null;

    return (
      <TextInput
        className="edit"
        onSave={this.onSave}
        value={this.props.label}
      />
    );
  }

  render() {
    const {
      canDrop, connectDragSource, connectDropTarget, isComplete, isDragging,
      isOver, label,
    } = this.props;

    const classes = classnames({
      completed: isComplete,
      dragging: isDragging,
      over: isOver && canDrop,
      editing: this.state.isEditing,
    });

    return connectDragSource(connectDropTarget(
      <li className={classes}>
        <div className="view">
          <input
            checked={isComplete}
            className="toggle"
            onChange={this.onChange}
            type="checkbox"
          />
          <label onDoubleClick={this.onDoubleClick}>
            {label}
          </label>
          <button className="destroy" onClick={this.onClick} />
        </div>
        {this.renderInput()}
      </li>
    ));
  }
}
