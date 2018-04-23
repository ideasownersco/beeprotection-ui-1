/**
 * @flow
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Touchable} from 'react-native';
import {NavigationActions} from 'react-navigation';
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
    return (
      <View style={styles.container}>
        <DrawerItem
          title={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          icon="ios-paper-plane"
          active={this.state.activeRoute === 'HomeStack'}
        />

        <Divider />

        <DrawerItem
          title={I18n.t('create_order')}
          routeName="CreateOrderStack"
          onItemPress={this.onItemPress}
          icon="ios-paper-plane"
          active={this.state.activeRoute === 'CreateOrderStack'}
        />

        <Divider />

        <DrawerItem
          title={I18n.t('cart')}
          routeName="CartStack"
          onItemPress={this.onItemPress}
          icon="ios-cart"
          active={this.state.activeRoute === 'CartStack'}
        />

        <Divider />

        <DrawerItem
          title={I18n.t('settings')}
          routeName="SettingsStack"
          onItemPress={this.onItemPress}
          icon="ios-paper-plane"
          active={this.state.activeRoute === 'SettingsStack'}
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
