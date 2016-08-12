import setup from '../support/componentSetup';
import Header from '../../js/components/Header';
import TextInput from '../../js/components/TextInput';

describe('<Header />', function () {
  const props = {
    onDoubleClick: sinon.stub(),
    onSave: sinon.stub(),
  };

  const { output } = setup(Header, props);
  const [h1, textInput] = output.props.children;

  it('renders correctly', function () {
    expect(output.type).to.equal('header');
    expect(output.props.className).to.equal('header');

    expect(h1.type).to.equal('h1');
    expect(h1.props.onDoubleClick).to.equal(props.onDoubleClick);
    expect(h1.props.children).to.equal('Todos');

    expect(textInput.type).to.equal(TextInput);
    expect(textInput.props.className).to.equal('new-todo');
    expect(textInput.props.onSave).to.equal(props.onSave);
    expect(textInput.props.placeholder).to.equal('What needs to be done?');
  });
});
