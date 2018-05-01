/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  ACTIONS as DRIVER_ACTIONS,
  ACTIONS as ORDER_ACTIONS,
} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {Linking, ScrollView, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import PropTypes from 'prop-types';
import OrderTotal from 'customer/orders/components/OrderTotal';
import DriverInfo from 'driver/components/DriverInfo';
import UserInfo from 'customer/components/UserInfo';
import DriverAssign from 'company/orders/components/DriverAssign';
import Button from 'components/Button';
import I18n from 'utils/locale';

class OrderDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  componentDidMount() {
    if (this.props.navigation.state && this.props.navigation.state.params) {
      let {orderID} = this.props.navigation.state.params;
      this.props.dispatch(ORDER_ACTIONS.fetchOrderDetails(orderID));
    }

    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  selectDriver = (driver: object) => {
    this.props.dispatch(
      DRIVER_ACTIONS.assignDriver(this.props.order.id, {
        driver_id: driver.id,
      }),
    );
  };

  trackOrder = () => {
    this.props.navigation.navigate('TrackOrder', {
      orderID: this.props.order.id,
    });
  };

  makeCall = mobile => {
    let url = `tel:${mobile}`;
    return Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  render() {
    let {order, drivers} = this.props;

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <OrderBasicInfo item={order} />
        <OrderItems order={order} />
        <OrderTotal total={order.total} />

        {order.user &&
          order.user.id && (
            <UserInfo user={order.user} makeCall={this.makeCall} />
          )}

        <DriverAssign
          order={order}
          drivers={drivers}
          onDriversListItemPress={this.selectDriver}
        />

        {order.job &&
          order.job.driver &&
          order.job.driver &&
          order.job.driver.user && (
            <View>
              <DriverInfo driver={order.job.driver} />
              <Button
                onPress={this.trackOrder}
                primary
                raised
                dark
                title={I18n.t('track')}
              />
            </View>
          )}
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      drivers: DRIVER_SELECTORS.getDrivers(state),
      order: getOrderByID(state, props.navigation.state.params.orderID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
