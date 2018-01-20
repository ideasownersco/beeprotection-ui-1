import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import OrdersList from 'driver/orders/components/OrdersList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/common/selectors';

class HomeScene extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchWorkingOrder());
    this.props.dispatch(DRIVER_ACTIONS.fetchUpcomingOrders());
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onStartStopButtonPress = () => {};

  onAddressButtonPress = (order: object) => {
    this.props.navigation.navigate('CustomerLocationMap', {
      order: order,
    });
  };

  render() {
    let {orders} = this.props;
    console.log('props', this.props);
    return (
      <View style={{flex: 1}}>
        <OrdersList
          items={orders}
          onItemPress={this.onOrdersListItemPress}
          onAddressButtonPress={this.onAddressButtonPress}
          onStartStopButtonPress={this.onStartStopButtonPress}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: DRIVER_SELECTORS.getUpcomingOrders(state),
  };
}

export default connect(mapStateToProps)(HomeScene);
