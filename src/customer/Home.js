import React, {Component} from 'react';
import {ScrollView, AppState} from 'react-native';
import HomeActionButtons from 'customer/components/HomeActionButtons';
import StandingOrdersList from 'customer/components/StandingOrdersList';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import {ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import WelcomeText from './components/WelcomeText';
import NavButton from "../components/NavButton";
import IconFactory from "../components/IconFactory";
import colors from "../assets/theme/colors";

class Home extends Component {
  static defaultProps = {
    upcoming_orders: [],
    working_order: {},
  };

  state = {
    appState: AppState.currentState,
  };


  // static navigationOptions = ({navigation}) => {
  //
  //   return {
  //     headerRight: (
  //       <NavButton
  //         icon={
  //           <IconFactory type="MaterialCommunityIcons" name="cart-outline" color="white" size={26}/>
  //         }
  //         onPress={() =>
  //           navigation.state.params &&
  //           navigation.state.params.handleRightButtonPress()
  //         }
  //       />
  //     ),
  //   };
  // };

  static navigationOptions = ({navigation}) => {
    return {
      // headerTransparent:true,
      headerStyle: {
        backgroundColor: 'transparent',
        position: 'absolute',
        height: 50,
        top: 0,
        left: 0,
        right: 0,
        borderBottomWidth: 0,
      },
      headerRight: (
        <NavButton
          icon={
            <IconFactory type="Ionicons" name="md-globe" color={colors.primary} size={26}/>
          }
          onPress={() =>
            navigation.state.params &&
            navigation.state.params.handleRightButtonPress()
          }
        />
      ),

    };
  };

  componentDidMount() {
    this.props.navigation.setParams({
      handleRightButtonPress: this.changeLanguage,
    });
    this.props.dispatch(ORDER_ACTIONS.fetchWorkingOrder());
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  changeLanguage = () => {
    this.props.navigation.navigate('LanguageSelect');
  };

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
    this.props.navigation.navigate('TrackDetail', {
      // orderID: item.id,
      order: item,
    });
  };

  onStandingOrderListItemPress = (item: Object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  render() {
    let {upcoming_orders, working_order} = this.props;

    return (
      <ScrollView style={{flex: 1, paddingTop: 80}}>
        <WelcomeText />
        <HomeActionButtons
          onCreateOrderPress={this.onCreateOrderPress}
          onProtectionPress={this.onProtectionPress}
        />
        {/*{working_order &&*/}
        {/*working_order.id && (*/}
        <StandingOrdersList
          items={working_order}
          onItemPress={this.onStandingOrderListItemPress}
          onItemTrackPress={this.onItemTrackPress}
        />
        // )}
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
