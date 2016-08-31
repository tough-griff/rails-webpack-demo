import { connect } from 'react-redux';

import { clearAlert } from '../../actions/ApplicationActionCreators';
import Alert from '../../components/Alert';

function mapDispatchToProps(dispatch, { clientId }) {
  return {
    onClick: () => {
      dispatch(clearAlert(clientId));
    },
  };
}

export default connect(null, mapDispatchToProps)(Alert);
