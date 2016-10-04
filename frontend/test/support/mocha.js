import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import './jsdom';

chai.use(chaiImmutable); // Must come before dirty-chai
chai.use(dirtyChai);
chai.use(sinonChai);

// Export globally.
global.expect = chai.expect;
global.sinon = sinon;
