import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'company/components/Drawer';
import HomeScene from 'company/HomeScene';
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

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  };
};

const HomeStack = StackNavigator({
  Home: {
    screen: HomeScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
  OrderDetail: {screen: OrderDetailScene},
  AddDriver: {screen: AddDriverScene},
  DriverDetail: {screen: DriverDetailScene},
  PastOrders: {screen: PastOrdersScene},
  UpcomingOrders: {screen: UpcomingOrdersScene},
  WorkingOrders: {screen: WorkingOrdersScene},
},{
  // initialRouteName:'WorkingOrders'
});

const DriversStack = StackNavigator({
  DriversList: {
    screen: DriversListScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
});

const PastOrdersStack = StackNavigator({
  PastOrders: {
    screen: PastOrdersScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
});

const UpcomingOrdersStack = StackNavigator({
  UpcomingOrders: {
    screen: UpcomingOrdersScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
});

const WorkingOrdersStack = StackNavigator({
  WorkingOrders: {
    screen: WorkingOrdersScene,
    navigationOptions: ({navigation}) => getDrawerIcon(navigation),
  },
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: SettingsScene,
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
