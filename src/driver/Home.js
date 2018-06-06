import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  AppState,
  RefreshControl,
  ScrollView,
  Switch,
  Text,
  View,
} from 'react-native';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {connect} from 'react-redux';
import OrdersList from 'driver/orders/components/OrdersList';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/selectors/orders';
import SectionHeading from 'company/components/SectionHeading';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import BackgroundGeolocation from 'react-native-background-geolocation';

class Home extends Component {
  static propTypes = {
    orders: PropTypes.array.isRequired,
  };

  static defaultProps = {
    orders: [],
  };

  state = {
    appState: AppState.currentState,
    online: true,
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Switch
          style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          value={navigation.state.params && navigation.state.params.online}
          onValueChange={value =>
            navigation.state.params &&
            navigation.state.params.handleRightButtonPress(value)
          }
          color={colors.success}
        />
      ),
    };
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchProfile());
    this.props.dispatch(DRIVER_ACTIONS.fetchWorkingOrder());
    this.props.dispatch(DRIVER_ACTIONS.fetchUpcomingOrders());
    AppState.addEventListener('change', this.handleAppStateChange);
    this.props.navigation.setParams({
      handleRightButtonPress: this.activateDriver,
      online: this.state.online,
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  activateDriver = () => {
    this.setState({
      online: !this.state.online,
    });
    this.props.navigation.setParams({
      online: !this.state.online,
    });
    BackgroundGeolocation.stop();
  };

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.props.dispatch(DRIVER_ACTIONS.fetchWorkingOrder());
    }
    this.setState({appState: nextAppState});
  };

  onOrdersListItemPress = (item: object) => {
    return this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  onStartStopButtonPress = () => {};

  onAddressButtonPress = (order: object) => {
    return this.props.navigation.navigate('TrackDetail', {
      orderID: order.id,
    });
  };

  loadUpcomingOrders = () => {
    // return this.props.navigation.navigate('UpcomingOrders');
  };

  onRefresh = () => {
    this.props.dispatch(DRIVER_ACTIONS.fetchWorkingOrder());
    this.props.dispatch(DRIVER_ACTIONS.fetchUpcomingOrders());
  };

  render() {
    let {orders, order} = this.props;

    return (
      <ScrollView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
        }>
        {order.id && (
          <View>
            <SectionHeading title={I18n.t('working_order')} />
            <OrdersList
              items={[order]}
              onItemPress={this.onOrdersListItemPress}
              onAddressButtonPress={this.onAddressButtonPress}
              onStartStopButtonPress={this.onStartStopButtonPress}
            />
          </View>
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

export default connect(mapStateToProps)(Home);
