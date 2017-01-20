import { getAlerts, getIsLoading } from '../../js/selectors/applicationSelectors';

describe('application selectors', function () {
  const application = {
    get: sinon.stub(),
  };

  const state = {
    get: sinon.stub().withArgs('application').returns(application),
  };

  describe('getAlerts()', function () {
    const alerts = [{ message: 'error' }];

    before(function () {
      application.get.withArgs('alerts').returns({
        toJS: sinon.stub().returns(alerts),
      });
    });

    it('returns the expected results', function () {
      expect(getAlerts(state)).to.eql(alerts);
    });
  });

  describe('getIsLoading()', function () {
    before(function () {
      application.get.withArgs('isLoading').returns(true);
    });


    it('returns the expected results', function () {
      expect(getIsLoading(state)).to.be.true();
    });
  });
});
