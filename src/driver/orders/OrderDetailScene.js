/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'driver/selectors/orders';
import {ScrollView, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import PropTypes from 'prop-types';
import OrderTotal from 'customer/orders/components/OrderTotal';

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

  static defaultProps = {
    order: {},
  };

  componentDidMount() {
    this.props.dispatch(
      ORDER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  render() {
    let {order} = this.props;

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        {order.packages && (
          <View>
            <OrderBasicInfo item={order} />
            <OrderItems order={order} />
            <OrderTotal total={order.total} />
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
      order: getOrderByID(state, props.navigation.state.params.orderID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
