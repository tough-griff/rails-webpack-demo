import { connect } from 'react-redux';

import AlertList from '../../components/AlertList';
import { getAlerts } from '../../selectors/applicationSelectors';

function mapStateToProps(state) {
  return {
    alerts: getAlerts(state),
  };
}

export default connect(mapStateToProps)(AlertList);
