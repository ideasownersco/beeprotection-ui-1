import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Settings from 'guest/Settings';
import CreateOrder from 'customer/orders/CreateOrder';
import DrawerIcon from 'components/DrawerIcon';
import BackButton from 'components/BackButton';
import BidList from '/customer/orders/BidList';
import OrderDetailScene from '/customer/orders/OrderDetailScene';
import TrackOrderScene from '/customer/orders/TrackOrderScene';
import Cart from '/customer/cart/Cart';
import DriverLocationMapScene from "customer/orders/DriverLocationMapScene";
import TrackDetailScene from "customer/orders/TrackDetailScene";

const AuthStack = StackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    RegisterScreen: {
      screen: Register,
    },
    ForgotScreen: {
      screen: Forgot,
    },
  },
  {
    headerMode: 'none',
  },
);

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
  CreateOrder: {screen: CreateOrder},
  BidList: {screen: BidList},
  OrderDetail: {screen: OrderDetailScene},
  TrackOrder: {screen: TrackOrderScene},
  Cart: {screen: Cart},
  Login: {
    screen: AuthStack,
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton onPress={() => navigation.goBack(null)} />,
    }),
  },
  DriverLocationMap: {
    screen: DriverLocationMapScene,
  },
  TrackDetail:{
    screen:TrackDetailScene
  }
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({navigation}) => ({
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  SettingsStack: {screen: SettingsStack},
};

export const Router = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});
