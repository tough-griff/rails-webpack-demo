import expect from 'expect.js';

import setup from '../support/componentSetup';

import Home from '../../src/components/Home';

describe('<Home />', function () {
  const { output } = setup(Home);


  it('renders correctly', function () {
    expect(output.type).to.equal('h1');
    expect(output.props.children).to.match(/Hello, world/);
  });
});
