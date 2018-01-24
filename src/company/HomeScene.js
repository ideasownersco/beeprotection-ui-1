import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/actions/orders';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import DriversList from 'driver/components/DriversList';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ACTIONS as DRIVER_ACTIONS} from 'company/actions/drivers';
import I18n from 'utils/locale';
import SectionHeading from 'company/components/SectionHeading';
import OrdersList from 'company/orders/components/OrdersList';

class HomeScene extends PureComponent {
  static propTypes = {
    drivers: PropTypes.array.isRequired,
    upcoming_orders: PropTypes.array.isRequired,
    current_orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
    upcoming_orders: [],
    current_orders: [],
  };

  componentDidMount() {
    // this.props.dispatch(ORDER_ACTIONS.fetchUpcomingOrders());
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrders());
    // this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  addDriver = () => {
    this.props.navigation.navigate('AddDriver');
  };

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail', {
      driverID: driver.id,
    });
  };

  loadUpcomingOrders = () => {
    this.props.navigation.navigate('UpcomingOrders');
  };

  loadCurrentOrders = () => {
    this.props.navigation.navigate('WorkingOrders');
  };

  render() {
    const {current_orders, upcoming_orders, drivers} = this.props;

    return (
      <ScrollView style={{flex: 1}}>
        <SectionHeading
          title={I18n.t('current_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadCurrentOrders}
        />

        <OrdersList
          items={current_orders}
          onItemPress={this.onOrdersListItemPress}
        />

        <SectionHeading
          title={I18n.t('list_of_drivers')}
          buttonTitle={I18n.t('add_driver')}
          onButtonPress={this.addDriver}
        />

        <DriversList
          items={drivers}
          onItemPress={this.onDriversListItemPress}
        />

        <SectionHeading
          title={I18n.t('upcoming_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadUpcomingOrders}
        />

        <OrdersList
          items={upcoming_orders}
          onItemPress={this.onOrdersListItemPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    upcoming_orders: ORDER_SELECTORS.getUpcomingOrders(state),
    current_orders: ORDER_SELECTORS.getWorkingOrders(state),
    drivers: DRIVER_SELECTORS.getDrivers(state),
  };
}

export default connect(mapStateToProps)(HomeScene);
