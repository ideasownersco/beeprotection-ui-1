/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'company/common/actions';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ScrollView} from 'react-native';
import OrderItems from 'company/orders/components/OrderItems';
import OrderBasicInfo from 'company/orders/components/OrderBasicInfo';
import DriverAssign from 'company/orders/components/DriverAssign';
import PropTypes from 'prop-types';

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

  assignDriver = () => {
    // this.props.dispatch(
    // ORDER_ACTIONS.makeBid({order_id: this.props.order.id, amount: this.state.amount}),
    // );
  };

  selectDriver = (driver: object) => {
    this.props.dispatch(
      DRIVER_ACTIONS.assignDriver(this.props.order.id, {
        driver_id: driver.id,
      }),
    );
  };

  render() {
    let {order, drivers} = this.props;

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <OrderBasicInfo item={order} />

        <OrderItems order={order} />

        <DriverAssign
          order={order}
          drivers={drivers}
          onDriversListItemPress={this.selectDriver}
        />
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
