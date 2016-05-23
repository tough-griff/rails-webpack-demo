import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

export { createMockStore };

// Export a singleton with blank initial state as default.
export default createMockStore({});
