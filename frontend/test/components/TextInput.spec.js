import setup from '../support/componentSetup';
import TextInput from '../../js/components/TextInput';

describe('<TextInput />', function () {
  const props = {
    className: 'className',
    onSave: sinon.stub(),
    placeholder: 'placeholder',
    value: 'value',
  };

  const { output, renderer } = setup(TextInput, props);

  beforeEach(function () {
    props.onSave.reset();
  });

  it('renders correctly', function () {
    expect(output.type).to.equal('input');
    expect(output.props.autoFocus).to.be.true();
    expect(output.props.className).to.equal(props.className);
    expect(output.props.onBlur).to.be.a('function');
    expect(output.props.onChange).to.be.a('function');
    expect(output.props.onKeyDown).to.be.a('function');
    expect(output.props.placeholder).to.equal(props.placeholder);
    expect(output.props.type).to.equal('text');
    expect(output.props.value).to.equal(props.value);
  });

  describe('#onBlur()', function () {
    beforeEach(function () {
      output.props.onBlur();
    });

    it('calls onSave correctly', function () {
      expect(props.onSave).to.have.been.calledOnce();
    });

    it('sets the state correctly', function () {
      const newOutput = renderer.getRenderOutput();
      expect(newOutput.props.value).to.equal('');
    });
  });

  describe('#onChange()', function () {
    it('sets state correctly', function () {
      output.props.onChange({ target: { value: 'newValue' } });
      const newOutput = renderer.getRenderOutput();
      expect(newOutput.props.value).to.equal('newValue');
    });
  });

  describe('#onKeyDown()', function () {
    it('calls onSave correctly', function () {
      output.props.onKeyDown({ keyCode: 10 });
      expect(props.onSave).not.to.have.been.called();
      output.props.onKeyDown({ keyCode: 13 });
      expect(props.onSave).to.have.been.calledOnce();
    });
  });
});
