import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, View} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import OrdersList from 'driver/orders/components/OrdersList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/selectors/orders';
import SectionHeading from 'company/components/SectionHeading';
import I18n from 'utils/locale';

class HomeScene extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(DRIVER_ACTIONS.fetchWorkingOrder());
    this.props.dispatch(DRIVER_ACTIONS.fetchUpcomingOrders());
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

  loadUpcomingOrders = () => {
    this.props.navigation.navigate('UpcomingOrders');
  };

  render() {
    let {orders, order} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <SectionHeading title={I18n.t('working_order')} />

        {order.id && (
          <OrdersList
            items={[order]}
            onItemPress={this.onOrdersListItemPress}
            onAddressButtonPress={this.onAddressButtonPress}
            onStartStopButtonPress={this.onStartStopButtonPress}
          />
        )}

        <SectionHeading
          title={I18n.t('upcoming_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadUpcomingOrders}
        />

        <OrdersList
          items={orders}
          onItemPress={this.onOrdersListItemPress}
          onAddressButtonPress={this.onAddressButtonPress}
          onStartStopButtonPress={this.onStartStopButtonPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: DRIVER_SELECTORS.getUpcomingOrders(state),
    order: DRIVER_SELECTORS.getWorkingOrder(state) || {},
  };
}

export default connect(mapStateToProps)(HomeScene);
