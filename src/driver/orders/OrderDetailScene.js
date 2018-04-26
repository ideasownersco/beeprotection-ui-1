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
import CustomerInfo from 'driver/components/CustomerInfo';
import SectionHeading from 'company/components/SectionHeading';
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

    console.log('order', order);

    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentContainerStyle={{paddingBottom: 50}}>
        {order.packages && (
          <View>
            <OrderBasicInfo item={order} />
            <OrderItems order={order} />
            <OrderTotal total={order.total} />
            {order.user && (
              <View>
                <SectionHeading title={I18n.t('customer_info')} />
                <CustomerInfo user={order.user} />
              </View>
            )}
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
      orders: ORDER_SELECTORS.getUpcomingOrders(state),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
