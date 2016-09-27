import setup from '../support/componentSetup';
import ClearButton from '../../js/components/ClearButton';

describe('<ClearButton />', function () {
  const props = {
    onClick: sinon.stub(),
  };

  const { output } = setup(ClearButton, props);

  it('renders correctly', function () {
    expect(output.type).to.equal('button');
    expect(output.props.className).to.equal('clear-completed');
    expect(output.props.onClick).to.equal(props.onClick);
    expect(output.props.children).to.equal('Clear complete');
  });
});
