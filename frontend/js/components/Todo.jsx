import cx from 'classnames';
import React, { Component, PropTypes } from 'react';

import TextInput from './TextInput';
import { todoPropTypes } from '../shapes';

/**
 * Represents a single todo item in a todo list.
 */
export default class Todo extends Component {
  static propTypes = {
    ...todoPropTypes,
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  state = {
    isEditing: false,
  };

  onDoubleClick = () => {
    this.setState({
      isEditing: true,
    });
  };

  onSave = (label) => {
    this.props.onSave(label);

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

  renderView() {
    const { isComplete, label, onChange, onClick } = this.props;

    return (
      <div className="view">
        <input
          checked={isComplete}
          className="toggle"
          onChange={onChange}
          type="checkbox"
        />
        <span className="label" onDoubleClick={this.onDoubleClick}>
          {label}
        </span>
        <button className="destroy" onClick={onClick} />
      </div>
    );
  }

  render() {
    const {
      canDrop, connectDragSource, connectDropTarget, isComplete, isDragging,
      isOver,
    } = this.props;

    const className = cx('todo', {
      completed: isComplete,
      dragging: isDragging,
      over: isOver && canDrop,
      editing: this.state.isEditing,
    });

    return connectDragSource(connectDropTarget(
      <li className={className}>
        {this.renderView()}
        {this.renderInput()}
      </li>
    ));
  }
}
