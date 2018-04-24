/**
 * @flow
 */
import React, {Component} from 'react';
import I18n from 'utils/locale';
import DrawerItem from 'components/DrawerItem';
import {DrawerSection} from 'react-native-paper';
import DrawerHeader from 'components/DrawerHeader';

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
    let {logout, user} = this.props.screenProps;
    let {activeRoute} = this.state;

    return (
      <DrawerSection>
        <DrawerHeader user={user} />

        <DrawerItem
          label={I18n.t('home')}
          routeName="HomeStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'home-outline',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'HomeStack'}
        />

        <DrawerItem
          label={I18n.t('working_orders')}
          routeName="WorkingOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'car-estate',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'WorkingOrdersStack'}
        />

        <DrawerItem
          label={I18n.t('upcoming_orders')}
          routeName="UpcomingOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'back-in-time', type: 'Entypo'}}
          active={activeRoute === 'UpcomingOrdersStack'}
        />

        <DrawerItem
          label={I18n.t('past_orders')}
          routeName="PastOrdersStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'timelapse', type: 'MaterialIcons'}}
          active={activeRoute === 'PastOrdersStack'}
        />

        <DrawerItem
          label={I18n.t('drivers')}
          routeName="DriversStack"
          onItemPress={this.onItemPress}
          iconProps={{name: 'people-outline', type: 'MaterialIcons'}}
          active={activeRoute === 'DriversStack'}
        />

        <DrawerItem
          label={I18n.t('track_drivers')}
          routeName="TrackDriversStack"
          onItemPress={this.onItemPress}
          iconProps={{
            name: 'map-marker-multiple',
            type: 'MaterialCommunityIcons',
          }}
          active={activeRoute === 'TrackDriversStack'}
        />

        <DrawerItem
          label={I18n.t('logout')}
          routeName="Logout"
          onItemPress={logout}
          iconProps={{name: 'logout', type: 'MaterialCommunityIcons'}}
          active={activeRoute === 'Logout'}
        />
      </DrawerSection>
    );
  }
}
