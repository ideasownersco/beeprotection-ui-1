import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import OrdersList from 'company/orders/components/OrdersList';

class PastOrdersScene extends PureComponent {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchPastOrders());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      order: item,
    });
  };

  onFetchMore = () => {
    this.props.dispatch(ORDER_ACTIONS.fetchPastOrders());
  };

  onPullToRefresh = () => {
    this.props.dispatch(ORDER_ACTIONS.fetchPastOrdersRefresh());
    this.props.dispatch(ORDER_ACTIONS.fetchPastOrders());
  };

  render() {
    const {orders, isFetching} = this.props;

    return (
      <OrdersList
        items={orders}
        onItemPress={this.onOrdersListItemPress}
        isFetching={isFetching}
        onFetchMore={this.onFetchMore}
        onPullToRefresh={this.onPullToRefresh}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getPastOrders(state),
    isFetching: state.company.past_orders.isFetching,
  };
}

export default connect(mapStateToProps)(PastOrdersScene);
