/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import Separator from 'components/Separator';

export default class Drawer extends Component {
  state = {
    activeRoute: 'HomeStack',
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activeRoute !== nextState.activeRoute;
  }

  onItemPress = (routeName: string) => {
    this.setState({
      activeRoute: routeName,
    });
    this.props.navigation.navigate(routeName);
  };

  logout = () => {
    this.props.screenProps.logout();
  };

  render() {
    let {logout} = this.props.screenProps;
    let {activeRoute} = this.state;

    return (
      <View style={styles.container}>
        <DrawerItem
          title={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'home-outline',
            type: 'MaterialCommunityIcons',
            size: 30,
          }}
          active={activeRoute === 'HomeStack'}
        />

        <Separator />
        <DrawerItem
          title={I18n.t('current_orders')}
          routeName="WorkingOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'car-estate',
            type: 'MaterialCommunityIcons',
            size: 30,
          }}
          active={activeRoute === 'WorkingOrdersStack'}
        />

        <Separator />
        <DrawerItem
          title={I18n.t('upcoming_orders')}
          routeName="UpcomingOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'back-in-time', type: 'Entypo', size: 30}}
          active={activeRoute === 'UpcomingOrdersStack'}
        />

        <Separator />
        <DrawerItem
          title={I18n.t('past_orders')}
          routeName="PastOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'timelapse', type: 'MaterialIcons', size: 30}}
          active={activeRoute === 'PastOrdersStack'}
        />

        <Separator />
        <DrawerItem
          title={I18n.t('drivers')}
          routeName="DriversStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'people-outline', type: 'MaterialIcons', size: 30}}
          active={activeRoute === 'DriversStack'}
        />

        <Separator />
        <DrawerItem
          title={I18n.t('settings')}
          routeName="SettingsStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'settings',
            type: 'MaterialCommunityIcons',
            size: 30,
          }}
          active={activeRoute === 'SettingsStack'}
        />

        <Separator />
        <DrawerItem
          title={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          iconProps={{name: 'logout', type: 'MaterialCommunityIcons', size: 30}}
          active={activeRoute === 'Logout'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fadedWhite,
    paddingHorizontal: 10,
    paddingTop: 30,
  },
});
