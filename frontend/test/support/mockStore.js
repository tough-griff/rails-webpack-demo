import configureMockStore from 'redux-mock-store';

// Export the `createMockStore` method if we need to create a new mock store.
export const createMockStore = configureMockStore();

// Export a singleton with blank initial state as default.
export default createMockStore({});
