import cx from 'classnames';
import pluralize from 'pluralize';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import ClearButton from './ClearButton';

/**
 * Manages routing using ReactRouter.Link, as well as renders a 'Clear complete'
 * button and complete tasks counter.
 */
function Footer({
  canDrop, completeCount, connectDropTarget, incompleteCount, isOver, onClick,
}) {
  const className = cx('footer', {
    over: isOver && canDrop,
  });

  const clearButton = (completeCount)
    ? <ClearButton onClick={onClick} />
    : null;

  return connectDropTarget(
    <footer className={className}>
      <span className="todo-count">
        {pluralize('task', incompleteCount, true)} remaining.
      </span>
      <ul className="filters">
        <li className="filter">
          <Link activeClassName="selected" to="/all">All</Link>
        </li>
        <li className="filter">
          <Link activeClassName="selected" to="/active">Active</Link>
        </li>
        <li className="filter">
          <Link activeClassName="selected" to="/completed">Completed</Link>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}

// We pass `todosFilter` to this component to trigger a re-render when the
// todosFilter changes. This allows `Link`'s `activeClassName` to work
// correctly.
Footer.propTypes = {
  canDrop: PropTypes.bool.isRequired,
  completeCount: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  isOver: PropTypes.bool.isRequired,
  maxIndex: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  todosFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
};

export default Footer;
