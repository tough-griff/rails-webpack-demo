import 'babel-polyfill';

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import chaiImmutable from 'chai-immutable';
import dirtyChai from 'dirty-chai';
import jsdomGlobal from 'jsdom-global';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

const HTML = `
<!DOCTYPE html>
<html>
  <head>
    <meta name="api-url" content="/api" />
    <meta name="csrf-token" content="FAKE_CSRF_TOKEN" />
  </head>
  <body></body>
</html>
`;

jsdomGlobal(HTML);

chai.use(chaiImmutable); // Must come before dirty-chai
chai.use(dirtyChai);
chai.use(sinonChai);
chai.use(chaiEnzyme());

// Export globally.
global.expect = chai.expect;
global.sinon = sinon;
