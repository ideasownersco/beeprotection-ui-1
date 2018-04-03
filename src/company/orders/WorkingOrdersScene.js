import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import OrdersList from 'company/orders/components/OrdersList';

class WorkingOrdersScene extends PureComponent {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrders());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onFetchMore = () => {
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrders());
  };

  onPullToRefresh = () => {
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrdersRefresh());
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrders());
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
    orders: ORDER_SELECTORS.getWorkingOrders(state),
    isFetching: state.company.working_orders.isFetching,
  };
}

export default connect(mapStateToProps)(WorkingOrdersScene);
