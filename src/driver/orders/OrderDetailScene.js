/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import {ScrollView} from 'react-native';
import OrderItems from 'company/orders/components/OrderItems';
import OrderBasicInfo from 'company/orders/components/OrderBasicInfo';
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
    order: PropTypes.object.isRequired,
  };

  static defaultProps = {
    order: {},
  };

  componentDidMount() {
    this.props.dispatch(
      ORDER_ACTIONS.fetchOrderDetails({
        order_id: this.props.navigation.state.params.orderID,
      }),
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  render() {
    let {order} = this.props;

    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <OrderBasicInfo item={order} />
        <OrderItems order={order} />
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
