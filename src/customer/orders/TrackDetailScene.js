/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View, AppState} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import I18n from 'utils/locale';
import Map from 'components/Map';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';

class TrackDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          order: PropTypes.object.isRequired,
        }),
      }),
    }),
  };

  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);

    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.order.id,
      ),
    );
    const {order} = this.props;
    if (order && order.trackeable) {
      this.props.dispatch(
        CUSTOMER_ACTIONS.subscribeToOrderTracking({
          job_id: order.job.id,
        }),
      );
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      const {order} = this.props;
      if (order && order.trackeable) {
        this.props.dispatch(
          CUSTOMER_ACTIONS.subscribeToOrderTracking({
            job_id: order.job.id,
          }),
        );
      }
    }
    this.setState({appState: nextAppState});
  };

  render() {
    let {order} = this.props;
    let {job} = order;
    let {tracking} = this.props;
    let {address} = order;
    let origin;

    if (tracking.latitude) {
      origin = tracking;
    } else {
      origin = {
        // latitude: 37.78825,
        // longitude: -122.4324,
        latitude:
          (job && job.driver && job.driver.latitude) || 29.3772392006689,
        longitude:
          (job && job.driver && job.driver.longitude) || 47.98511826155676,
        heading: 0,
      };
    }

    if (order.trackeable) {
      return (
        <Map
          origin={origin}
          destination={{
            latitude: address.latitude,
            longitude: address.longitude,
          }}
        />
      );
    }

    return (
      <View style={{padding: 10}}>
        <Text style={{textAlign: 'center'}}>
          {I18n.t('tracking_not_available')}
        </Text>
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const getLocationUpdatesForJob = ORDER_SELECTORS.getLocationUpdatesForJob();
  const mapStateToProps = (state, props) => {
    const {order} = props.navigation.state.params;
    const job = (order && order.job) || {};
    return {
      order: getOrderByID(state, order.id),
      tracking: job.id ? getLocationUpdatesForJob(state, job.id) : {},
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TrackDetailScene);
