import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';

import mockStore from '../support/mockStore';
import Alert from '../../js/components/Alert';
import AlertList from '../../js/components/AlertList';

describe('<AlertList />', function () {
  let wrapper;

  const props = {
    alerts: [{
      clientId: 1,
      message: 'message',
      type: 'error',
    }, {
      clientId: 2,
      message: 'some info',
      type: 'notice',
    }],
  };

  // NOTE: Shallow seems to break when rendering with connected children.
  beforeEach(function render() {
    wrapper = mount(
      <Provider store={mockStore}>
        <AlertList {...props} />
      </Provider>
    );
  });

  it('renders correctly', function () {
    expect(wrapper).to.have.tagName('ul');
    expect(wrapper).to.have.className('alert-list');
  });

  it('renders the child components correctly', function () {
    expect(wrapper).to.have.exactly(2).descendants(Alert);
  });

  context('with no alerts provided', function () {
    beforeEach(function render() {
      wrapper = shallow(<AlertList alerts={[]} />);
    });

    it('renders no child components', function () {
      expect(wrapper).not.to.have.descendants(Alert);
    });
  });
});
