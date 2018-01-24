import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'driver/components/Drawer';
import HomeScene from 'driver/HomeScene';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';
import OrderDetailScene from 'driver/orders/OrderDetailScene';
import CustomerLocationMapScene from 'driver/orders/CustomerLocationMapScene';
import PastOrdersScene from 'driver/orders/PastOrdersScene';
import UpcomingOrdersScene from 'driver/orders/UpcomingOrdersScene';

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
  CustomerLocationMap: {
    screen: CustomerLocationMapScene,
  },
  PastOrders: {screen: PastOrdersScene},
  UpcomingOrders: {screen: UpcomingOrdersScene},
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
  Login: {
    screen: Login,
  },
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
