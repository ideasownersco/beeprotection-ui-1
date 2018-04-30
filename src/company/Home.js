import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {RefreshControl, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import DriversList from 'driver/components/DriversList';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ACTIONS as COMPANY_ACTIONS} from 'company/common/actions';
import I18n from 'utils/locale';
import SectionHeading from 'company/components/SectionHeading';
import OrdersList from 'company/orders/components/OrdersList';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';

class Home extends PureComponent {
  static propTypes = {
    drivers: PropTypes.array.isRequired,
    upcoming_orders: PropTypes.array.isRequired,
    working_orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
    upcoming_orders: [],
    working_orders: [],
  };

  state = {
    refreshing: false,
  };

  componentDidMount() {
    this.fetchData();
    this.props.dispatch(COMPANY_ACTIONS.fetchDrivers());
    this.props.dispatch(COMPANY_ACTIONS.fetchTimings());
  }

  fetchData = () => {
    this.props.dispatch(
      ORDER_ACTIONS.fetchUpcomingOrders({
        force: true,
      }),
    );
    this.props.dispatch(
      ORDER_ACTIONS.fetchWorkingOrders({
        force: true,
      }),
    );
  };

  _onRefresh = () => {
    // this.setState({refreshing: true});
    this.fetchData();
    // setTimeout(() => {
    //   this.setState({refreshing: false});
    // }, 1000);
  };

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  addDriver = () => {
    this.props.navigation.navigate('DriverAdd', {
      userType: 'driver',
    });
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
    const {working_orders, upcoming_orders, drivers} = this.props;

    return (
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }>
        <SectionHeading
          title={I18n.t('working_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadCurrentOrders}
        />

        <OrdersList
          items={working_orders}
          onItemPress={this.onOrdersListItemPress}
        />

        <SectionHeading
          title={I18n.t('list_of_drivers')}
          buttonTitle={I18n.t('driver_add')}
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
    working_orders: ORDER_SELECTORS.getWorkingOrders(state),
    drivers: DRIVER_SELECTORS.getDrivers(state),
  };
}

export default connect(mapStateToProps)(Home);
