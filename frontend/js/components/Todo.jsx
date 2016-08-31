import cx from 'classnames';
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
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
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

  render() {
    const {
      canDrop, connectDragSource, connectDropTarget, isComplete, isDragging,
      isOver, label, onChange, onClick,
    } = this.props;

    const className = cx('todo', {
      completed: isComplete,
      dragging: isDragging,
      over: isOver && canDrop,
      editing: this.state.isEditing,
    });

    return connectDragSource(connectDropTarget(
      <li className={className}>
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
        {this.renderInput()}
      </li>
    ));
  }
}
