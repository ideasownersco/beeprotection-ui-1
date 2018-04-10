import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';
import Drawer from 'customer/components/Drawer';
import Home from 'customer/Home';
import Map from 'customer/Map';
import Settings from 'guest/Settings';
import CreateOrder from 'customer/orders/CreateOrder';
import DrawerIcon from 'components/DrawerIcon';
import BackButton from 'components/BackButton';
import BidList from 'customer/orders/BidList';
import OrderDetailScene from 'customer/orders/OrderDetailScene';
import TrackOrderScene from 'customer/orders/TrackOrderScene';
import Cart from 'customer/cart/Cart';
import TrackDetailScene from 'customer/orders/TrackDetailScene';
import PastOrdersScene from 'customer/orders/PastOrdersScene';
import UpcomingOrdersScene from 'customer/orders/UpcomingOrdersScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

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
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);

const HomeStack = StackNavigator(
  {

    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('customer_home'),
        ...getDrawerIcon(navigation),
      }),
    },
    CreateOrder: {
      screen: CreateOrder,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('create_order'),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
    TrackOrder: {
      screen: TrackOrderScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('track_order'),
      }),
    },
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
    Map:{
      screen:Map,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      headerTintColor: colors.primary,
    }),
    initialRouteName:'Map'
  },
);

const PastOrdersStack = StackNavigator(
  {
    PastOrders: {
      screen: PastOrdersScene,
      navigationOptions: ({navigation}) => {
        return {
          ...getDrawerIcon(navigation),
          title: I18n.t('past_orders'),
        };
      },
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);

const UpcomingOrdersStack = StackNavigator(
  {
    UpcomingOrders: {
      screen: UpcomingOrdersScene,
      navigationOptions: ({navigation}) => {
        return {
          ...getDrawerIcon(navigation),
          title: I18n.t('upcoming_orders'),
        };
      },
    },
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);

const SettingsStack = StackNavigator(
  {
    Settings: {
      screen: Settings,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
      }),
    },
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);

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
