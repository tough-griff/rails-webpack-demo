import { connect } from 'react-redux';

import AlertList from '../../components/AlertList';

function mapStateToProps(state) {
  return {
    alerts: state.application.get('alerts').toJS(),
  };
}

export default connect(mapStateToProps, null)(AlertList);
