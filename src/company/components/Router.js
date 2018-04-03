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
        headerLeft: (
          <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
        ),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
    AddDriver: {screen: AddDriverScene},
    DriverDetail: {screen: DriverDetailScene},
    PastOrders: {screen: PastOrdersScene},
    UpcomingOrders: {screen: UpcomingOrdersScene},
    WorkingOrders: {screen: WorkingOrdersScene},
  },
  {
    // initialRouteName:'WorkingOrders'
  },
);

const DriversStack = StackNavigator({
  DriversList: {
    screen: DriversListScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
  OrderDetail: {screen: OrderDetailScene},
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

const WorkingOrdersStack = StackNavigator({
  WorkingOrders: {
    screen: WorkingOrdersScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
  OrderDetail: {screen: OrderDetailScene},
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
});
const TrackDriversStack = StackNavigator({
  TrackDrivers: {
    screen: TrackDriversScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
});

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
});
