import React from 'react';
import {DrawerNavigator, StackNavigator} from 'react-navigation';
import Drawer from 'driver/components/Drawer';
import Home from 'driver/Home';
import Login from 'guest/Login';
import DrawerIcon from 'components/DrawerIcon';
import OrderDetailScene from 'driver/orders/OrderDetailScene';
import TrackDetailScene from 'driver/orders/TrackDetailScene';
import PastOrdersScene from 'driver/orders/PastOrdersScene';
import UpcomingOrdersScene from 'driver/orders/UpcomingOrdersScene';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import PhotosUploadScene from 'driver/orders/PhotosUploadScene';

const getDrawerIcon = navigation => {
  return {
    headerLeft: (
      <DrawerIcon onPress={() => navigation.navigate('DrawerToggle')} />
    ),
  };
};

const navStyle = {
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },
};

const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({navigation}) => ({
        title: I18n.t('driver_home'),
        ...getDrawerIcon(navigation),
      }),
    },
    OrderDetail: {screen: OrderDetailScene},
    TrackDetail: {
      screen: TrackDetailScene,
    },
    PastOrders: {screen: PastOrdersScene},
    UpcomingOrders: {screen: UpcomingOrdersScene},
    PhotosUpload: {
      screen: PhotosUploadScene,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      ...navStyle,
    }),
    // initialRouteName:'PhotosUpload'
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
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      ...navStyle,
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
    navigationOptions: ({navigation}) => ({
      gesturesEnabled: false,
      ...navStyle,
    }),
  },
);

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
  contentComponent: props => <Drawer {...props} />,
  drawerWidth: 275,
});
