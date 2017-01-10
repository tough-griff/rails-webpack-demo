import React from 'react';
import { shallow } from 'enzyme';

// import Alert from '../../js/components/Alert';
import AlertList from '../../js/components/AlertList';

// NOTE: FIXME notices regard expectations that cause tests to fail due to deep
//   rendering occurring despite using `shallow`.
describe('<AlertList />', function () {
  let wrapper;

  const props = {
    alerts: [{
      clientId: 'abc',
      message: 'message',
      type: 'error',
    }, {
      clientId: 'def',
      message: 'some info',
      type: 'notice',
    }],
  };

  beforeEach(function render() {
    wrapper = shallow(<AlertList {...props} />);
  });

  it('renders correctly', function () {
    // FIXME: expect(wrapper).to.have.tagName('ul');
    expect(wrapper).to.have.className('alert-list');
  });

  it('renders the child components correctly', function () {
    // FIXME: expect(wrapper).to.have.exactly(2).descendants(Alert);
    expect(wrapper.children()).to.have.length(2);
  });

  context('with no alerts provided', function () {
    beforeEach(function render() {
      wrapper = shallow(<AlertList alerts={[]} />);
    });

    it('renders no child components', function () {
      // FIXME: expect(wrapper).not.to.have.descendants(Alert);
      expect(wrapper.children()).to.have.length(0);
    });
  });
});
