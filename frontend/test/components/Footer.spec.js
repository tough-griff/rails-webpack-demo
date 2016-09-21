import setup from '../support/componentSetup';
import Footer from '../../js/components/Footer';
import ClearButton from '../../js/components/ClearButton';

describe('<Footer />', function () {
  const props = {
    canDrop: false,
    completeCount: 0,
    connectDropTarget: el => el,
    count: 0,
    isOver: true,
    maxIndex: 0,
    onClick: sinon.stub(),
    onDrop: sinon.stub(),
    todosFilter: 'all',
  };

  const { output } = setup(Footer, props);
  const list = output.props.children[1];

  it('renders correctly', function () {
    expect(output.type).to.equal('footer');
    expect(output.props.className).to.equal('footer');

    expect(list.type).to.equal('ul');
    expect(list.props.className).to.equal('filters');
    expect(list.props.children.length).to.equal(3);
  });

  context('with a zero complete count', function () {
    const button = output.props.children[2];

    it('does not render the clear complete button', function () {
      expect(button).to.be.null();
    });
  });

  context('with a nonzero complete count', function () {
    const { output: completeOutput } = setup(Footer, {
      ...props, completeCount: 1, count: 2,
    });
    const button = completeOutput.props.children[2];

    it('renders the clear complete button', function () {
      expect(button.type).to.equal(ClearButton);
      expect(button.props.onClick).to.be.a('function');
    });
  });
});
