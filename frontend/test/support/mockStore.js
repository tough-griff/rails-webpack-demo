import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

// Export a singleton with blank initial state as default.
export default createMockStore({});

// Export the `createMockStore` method if we need to create a new mock store.
export { createMockStore };
