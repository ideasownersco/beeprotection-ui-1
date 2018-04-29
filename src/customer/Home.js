import React, {Component} from 'react';
import {AppState, ScrollView} from 'react-native';
import HomeActionButtons from 'customer/components/HomeActionButtons';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import WelcomeText from 'customer/components/WelcomeText';
import StandingOrdersList from 'customer/components/StandingOrdersList';
import moment from 'moment';

class Home extends Component {
  static defaultProps = {
    upcoming_orders: [],
    working_order: {},
  };

  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrder());
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
      this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrder());
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

  render() {
    let {working_order} = this.props;

    return (
      <ScrollView style={{flex: 1}} contentContainer={{paddingVertical: 100}}>
        <WelcomeText />

        <HomeActionButtons
          onCreateOrderPress={this.onCreateOrderPress}
          onProtectionPress={this.onProtectionPress}
        />

        <StandingOrdersList
          items={working_order}
          onItemPress={this.onStandingOrderListItemPress}
          onItemTrackPress={this.onItemTrackPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    upcoming_orders: SELECTORS.getUpcomingOrders(state),
    working_order: SELECTORS.getWorkingOrder(state),
  };
}

export default connect(mapStateToProps)(Home);
