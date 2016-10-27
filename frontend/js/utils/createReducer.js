import camelCase from 'camel-case';

/**
 * Reducer factory.
 */
export default function createReducer(initialState, actionReducers) {
  /**
   * If the action type corresponds to a handler in REDUCERS, return a
   * reduction of the state. If no corresponding action is found, simply pass
   * the state through.
   */
  return (state = initialState, { payload, type }) => {
    const reducer = actionReducers[camelCase(type)];

    return (reducer) ? reducer(state, payload) : state;
  };
}
