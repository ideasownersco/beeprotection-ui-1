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
import TrackDetailScene from 'customer/orders/TrackDetailScene';
import PastOrdersScene from 'customer/orders/PastOrdersScene';
import UpcomingOrdersScene from 'customer/orders/UpcomingOrdersScene';
import I18n from 'utils/locale';

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  };
};

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
      title: I18n.t('home'),
      headerLeft: (
        <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
      ),
    }),
  },
  CreateOrder: {
    screen: CreateOrder,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('create_order'),
    }),
  },
  BidList: {screen: BidList},
  OrderDetail: {screen: OrderDetailScene},
  TrackOrder: {screen: TrackOrderScene},
  Cart: {
    screen: Cart,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('cart'),
    }),
  },
  Login: {
    screen: AuthStack,
    navigationOptions: ({navigation}) => ({
      headerLeft: <BackButton onPress={() => navigation.goBack(null)} />,
    }),
  },
  // DriverLocationMap: {
  //   screen: DriverLocationMapScene,
  // },
  TrackDetail: {
    screen: TrackDetailScene,
  },
  PastOrders: {screen: PastOrdersScene},
  UpcomingOrders: {screen: UpcomingOrdersScene},
},{
  navigationOptions: ({navigation}) => ({
    gesturesEnabled: false
  })
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

const PastOrdersStack = StackNavigator({
  PastOrders: {
    screen: PastOrdersScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
  OrderDetail: {screen: OrderDetailScene},
});

const UpcomingOrdersStack = StackNavigator({
  UpcomingOrders: {
    screen: UpcomingOrdersScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
  OrderDetail: {screen: OrderDetailScene},
});

const DrawerRoutes = {
  HomeStack: {
    screen: HomeStack,
  },
  SettingsStack: {screen: SettingsStack},
  PastOrdersStack: {screen: PastOrdersStack},
  UpcomingOrdersStack: {screen: UpcomingOrdersStack},
};

export const Router = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
});
