import { ENTER } from 'key-code';
import React, { Component, PropTypes } from 'react';

/**
 * General purpose text input component.
 */
export default class TextInput extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
    value: '',
  };

  state = {
    value: this.props.value || '',
  };

  onBlur = (_evt) => {
    this.props.onSave(this.state.value.trim());
    this.setState({
      value: '',
    });
  };

  onChange = (evt) => {
    this.setState({
      value: evt.target.value,
    });
  };

  onKeyDown = (evt) => {
    if (evt.keyCode !== ENTER) return;
    this.onBlur();
  };

  render() {
    const { className, placeholder } = this.props;

    return (
      <input
        autoFocus
        className={className}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        placeholder={placeholder}
        type="text"
        value={this.state.value}
      />
    );
  }
}
