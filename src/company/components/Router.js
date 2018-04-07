import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'company/components/Drawer';
import Home from 'company/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';
import OrderDetailScene from 'company/orders/OrderDetailScene';
import PastOrdersScene from 'company/orders/PastOrdersScene';
import UpcomingOrdersScene from 'company/orders/UpcomingOrdersScene';
import WorkingOrdersScene from 'company/orders/WorkingOrdersScene';
import DriversListScene from 'company/drivers/DriversListScene';
import AddDriverScene from 'company/drivers/AddDriverScene';
import DriverDetailScene from 'company/drivers/DriverDetailScene';
import SettingsScene from 'company/SettingsScene';
import TrackDriversScene from 'company/drivers/TrackScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import TrackDetailScene from 'company/orders/TrackDetailScene';

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  };
};

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('admin_home'),
        ...getDrawerIcon(navigation),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
    AddDriver: {
      screen: AddDriverScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('driver_add'),
      }),
    },
    DriverDetail: {screen: DriverDetailScene},
    PastOrders: {
      screen: PastOrdersScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('past_orders'),
      }),
    },
    UpcomingOrders: {
      screen: UpcomingOrdersScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('upcoming_orders'),
      }),
    },
    WorkingOrders: {
      screen: WorkingOrdersScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('working_orders'),
      }),
    },
    TrackDetail: {
      screen: TrackDetailScene,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('track_driver'),
      }),
    },
  },
  {
    // initialRouteName:'TrackDetail',
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);

const DriversStack = StackNavigator(
  {
    DriversList: {
      screen: DriversListScene,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('drivers'),
      }),
    },
    DriverDetail: {screen: DriverDetailScene},
    OrderDetail: {screen: OrderDetailScene},
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);

const PastOrdersStack = StackNavigator(
  {
    PastOrders: {
      screen: PastOrdersScene,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('past_orders'),
      }),
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
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('upcoming_orders'),
      }),
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

const WorkingOrdersStack = StackNavigator(
  {
    WorkingOrders: {
      screen: WorkingOrdersScene,
      navigationOptions: ({navigation}) => ({
        ...getDrawerIcon(navigation),
        title: I18n.t('working_orders'),
      }),
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
      screen: SettingsScene,
      navigationOptions: ({navigation}) => getDrawerIcon(navigation),
    },
  },
  {
    // initialRouteName:'WorkingOrders'
    navigationOptions: ({navigation}) => ({
      headerTintColor: colors.primary,
    }),
  },
);
const TrackDriversStack = StackNavigator(
  {
    TrackDrivers: {
      screen: TrackDriversScene,
      navigationOptions: ({navigation}) => getDrawerIcon(navigation),
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
  HomeStack: {screen: HomeStack},
  DriversStack: {screen: DriversStack},
  PastOrdersStack: {screen: PastOrdersStack},
  WorkingOrdersStack: {screen: WorkingOrdersStack},
  UpcomingOrdersStack: {screen: UpcomingOrdersStack},
  SettingsStack: {screen: SettingsStack},
  TrackDriversStack: {screen: TrackDriversStack},
  Login: {screen: Login},
};

export const Router = DrawerNavigator(DrawerRoutes, {
  gesturesEnabled: false,
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  // initialRouteName:'TrackDriversStack'
});
