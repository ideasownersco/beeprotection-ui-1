import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'driver/selectors/orders';
import OrdersList from 'company/orders/components/OrdersList';

class WorkingOrdersScene extends PureComponent {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrder());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  render() {
    const {orders, isFetching} = this.props;

    return (
      <OrdersList
        items={[orders]}
        onItemPress={this.onOrdersListItemPress}
        isFetching={isFetching}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: ORDER_SELECTORS.getWorkingOrder(state),
    isFetching: state.driver.working_order.isFetching,
  };
}

export default connect(mapStateToProps)(WorkingOrdersScene);
