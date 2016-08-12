import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTodo, fetchAllTodos } from '../../actions/TodoActionCreators';
import Header from '../../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ addTodo, fetchAllTodos }, dispatch),
  };
}

class HeaderContainer extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fetchAllTodos: PropTypes.func.isRequired,
  };

  onSave = (label) => {
    if (!label.length) return;

    this.props.addTodo(label);
  };

  render() {
    return (
      <Header
        onDoubleClick={this.props.fetchAllTodos}
        onSave={this.onSave}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(HeaderContainer);
