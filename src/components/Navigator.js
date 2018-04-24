import React, {Component} from 'react';
import NavigatorService from 'components/NavigatorService';
import {StackNavigator} from 'react-navigation';
import {Router as AdminRouter} from 'company/components/Router';
import {Router as DriverRouter} from 'driver/components/Router';
import {Router as CustomerRouter} from 'customer/components/Router';
import {Router as GuestRouter} from 'guest/components/Router';

export default class Navigator extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.isAuthenticated !== nextProps.isAuthenticated ||
      this.props.userType !== nextProps.userType
    );
  }

  resolveScreenForUser = userType => {
    switch (userType) {
      case 10:
        return 'Driver';
      case 100:
        return 'Admin';
      default:
        return 'Customer';
    }
  };

  render() {
    let {isAuthenticated, user, userType, logout} = this.props;
    const screen = this.resolveScreenForUser(userType);

    const AppNavigator = StackNavigator(
      {
        Guest: {screen: GuestRouter},
        Admin: {screen: AdminRouter},
        Driver: {screen: DriverRouter},
        Customer: {screen: CustomerRouter},
      },
      {
        headerMode: 'none',
        initialRouteName: isAuthenticated ? screen : 'Customer',
      },
    );

    return (
      <AppNavigator
        ref={navigatorRef => {
          NavigatorService.setContainer(navigatorRef);
        }}
        screenProps={{isAuthenticated, user, logout}}
      />
    );
  }
}
