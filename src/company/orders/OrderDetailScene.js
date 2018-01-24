/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'company/actions/drivers';
import {ACTIONS as ORDER_ACTIONS} from 'company/actions/orders';
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
    this.props.dispatch(
      ORDER_ACTIONS.fetchOrderDetails({
        order_id: this.props.navigation.state.params.orderID,
      }),
    );
    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.total) {
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
      DRIVER_ACTIONS.assignToOrder({
        order_id: this.props.order.id,
        driver_id: driver.id,
      }),
    );
  };

  render() {
    let {order, drivers} = this.props;

    console.log('order', order);

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
