import chai from 'chai';
import chaiThings from 'chai-things';
import dirtyChai from 'dirty-chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import './jsdom';
import './fetch-mock';

chai.use(chaiThings);
chai.use(dirtyChai);
chai.use(sinonChai);

// Export globally.
global.expect = chai.expect;
global.sinon = sinon;
