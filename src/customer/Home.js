import React, {Component} from 'react';
import {
  AppState,
  ImageBackground,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import StandingOrdersList from 'customer/components/StandingOrdersList';
import colors from 'assets/theme/colors';

class Home extends Component {
  static defaultProps = {
    upcoming_orders: [],
    working_order: {},
  };

  state = {
    appState: AppState.currentState,
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerStyle: {
        backgroundColor: colors.secondary,
        borderBottomWidth: 0,
      },
      // headerLeft: <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />,
    };
  };

  componentDidMount() {
    this.fetchWorkingOrders();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this.fetchWorkingOrders();
    }
    this.setState({appState: nextAppState});
  };

  onCreateOrderPress = () => {
    this.props.navigation.navigate('CreateOrder');
  };

  onProtectionPress = () => {};

  onItemTrackPress = (item: Object) => {
    this.props.navigation.navigate('TrackOrder', {
      orderID: item.id,
      order: item,
    });
  };

  onStandingOrderListItemPress = (item: Object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  fetchWorkingOrders = () => {
    this.props.dispatch(
      ORDER_ACTIONS.fetchWorkingOrders({
        force: true,
      }),
    );
  };

  onRefresh = () => {
    this.fetchWorkingOrders();
  };

  render() {
    let {working_order} = this.props;

    return (
      <ImageBackground
        source={require('./../assets/images/home-bg.png')}
        resizeMode="stretch"
        style={{flex: 1, backgroundColor: '#2D72A8'}}>
        {/*<HomeActionButtons*/}
        {/*onCreateOrderPress={this.onCreateOrderPress}*/}
        {/*onProtectionPress={this.onProtectionPress}*/}
        {/*/>*/}

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          refreshing={false}
          contentContainerStyle={{paddingTop: 400}}>
          <StandingOrdersList
            items={working_order}
            onItemPress={this.onStandingOrderListItemPress}
            onItemTrackPress={this.onItemTrackPress}
            onCreateOrderPress={this.onCreateOrderPress}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    working_order: SELECTORS.getWorkingOrder(state),
  };
}

export default connect(mapStateToProps)(Home);
