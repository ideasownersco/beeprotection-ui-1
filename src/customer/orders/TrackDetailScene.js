/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import I18n from 'utils/locale';
import Map from 'customer/orders/components/Map';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';
import {ACTIONS} from "customer/common/actions";
import {bindActionCreators} from "redux";

class TrackDetailScene extends Component {

  componentDidMount() {
    this.props.actions.fetchOrderDetails(this.props.navigation.state.params.orderID);
  }

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  componentDidMount() {
    const {order} = this.props;
    if (order.tracking_on) {
      this.props.dispatch(
        CUSTOMER_ACTIONS.subscribeToOrderTracking({
          order_id: order.id,
        }),
      );
    }
  }

  render() {
    let {order} = this.props;
    let {tracking} = this.props;

    console.log('tracking',tracking);

    let {address} = order;

    // const {accepted_job} = this.props.navigation.state.params.order;

    let origin;

    if (tracking.latitude) {
      origin = tracking;
    } else {
      origin = {
        latitude: 37.78825,
        longitude: -122.4324,
        // latitude: 29.3772392006689,
        // longitude: 47.98511826155676,
        heading: 0,
      };
    }

    if (!order.is_working) {
      return (
        <View style={{padding: 10}}>
          <Text style={{textAlign: 'center'}}>
            {I18n.t('tracking_not_available')}
          </Text>
        </View>
      );
    }

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
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...ACTIONS,},
      dispatch,
    ),
  };
}

const makeMapStateToProps = () => {

  // const mapStateToProps = (state, props) => {
  //   const {accepted_job} = props.navigation.state.params.order;
  //
  //   return {
  //     tracking: accepted_job
  //       ? getLocationUpdatesForJob(state, accepted_job.id)
  //       : {},
  //   };
  // };

  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const getLocationUpdatesForOrder = ORDER_SELECTORS.getLocationUpdatesForOrder();

  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
      tracking: getLocationUpdatesForOrder(state, props.navigation.state.params.orderID)
    };
  };

  return mapStateToProps;

};

export default connect(makeMapStateToProps,mapDispatchToProps)(TrackDetailScene);
