import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import HomeActionButtons from 'customer/components/HomeActionButtons';
import StandingOrdersList from 'customer/components/StandingOrdersList';
import {SELECTORS} from 'customer/common/selectors';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import WelcomeText from './components/WelcomeText';

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(ORDER_ACTIONS.fetchUpcomingOrders());
  }

  onCreateOrderPress = () => {
    this.props.navigation.navigate('CreateOrder');
  };

  onProtectionPress = () => {};

  onItemTrackPress = (item: Object) => {
    this.props.navigation.navigate('TrackOrder', {
      orderID: item.id,
    });
  };

  onStandingOrderListItemPress = (item: Object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  render() {
    let {orders} = this.props;

    console.log('orders', orders);

    return (
      <ScrollView style={{flex: 1}}>
        <WelcomeText />

        <HomeActionButtons
          onCreateOrderPress={this.onCreateOrderPress}
          onProtectionPress={this.onProtectionPress}
        />

        <StandingOrdersList
          items={orders || []}
          onItemPress={this.onStandingOrderListItemPress}
          onItemTrackPress={this.onItemTrackPress}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    orders: SELECTORS.getOrders(state),
  };
}

export default connect(mapStateToProps)(Home);
