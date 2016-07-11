import expect from 'expect.js';
import sinon from 'sinon';

import './jsdom';

// Export globally.
global.expect = expect;
global.sinon = sinon;
