/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import Divider from 'components/Divider';

export default class Drawer extends Component {
  onItemPress = (routeName: string) => {
    this.setState({
      activeRoute: routeName,
    });
    this.props.navigation.navigate(routeName);
  };

  state = {
    activeRoute: 'HomeStack',
  };

  render() {
    let {isAuthenticated, logout} = this.props.screenProps;
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
          active={this.state.activeRoute === 'HomeStack'}
        />

        <Divider />
        <DrawerItem
          title={I18n.t('upcoming_orders')}
          routeName="UpcomingOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'back-in-time', type: 'Entypo', size: 30}}
          active={activeRoute === 'UpcomingOrdersStack'}
        />

        <Divider />
        <DrawerItem
          title={I18n.t('past_orders')}
          routeName="PastOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'timelapse', type: 'MaterialIcons', size: 30}}
          active={activeRoute === 'PastOrdersStack'}
        />

        <Divider />

        {isAuthenticated ? (
          <View>
            {/*<DrawerItem*/}
            {/*title={I18n.t('settings')}*/}
            {/*routeName="Settings"*/}
            {/*onItemPress={this.onItemPress}*/}
            {/*iconProps={{*/}
            {/*name: 'settings',*/}
            {/*type: 'MaterialCommunityIcons',*/}
            {/*size: 30,*/}
            {/*}}*/}
            {/*active={this.state.activeRoute === 'Logout'}*/}
            {/*/>*/}
            <DrawerItem
              title={I18n.t('logout')}
              routeName="Logout"
              onItemPress={logout}
              iconProps={{
                name: 'logout',
                type: 'MaterialCommunityIcons',
                size: 30,
              }}
              active={this.state.activeRoute === 'Logout'}
            />
          </View>
        ) : (
          <DrawerItem
            title={I18n.t('login')}
            routeName="Login"
            onItemPress={this.onItemPress}
            iconProps={{
              name: 'login',
              type: 'MaterialCommunityIcons',
              size: 30,
            }}
            active={this.state.activeRoute === 'Login'}
          />
        )}
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
