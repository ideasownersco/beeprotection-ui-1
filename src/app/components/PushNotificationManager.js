import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS, View} from 'react-native';
import {withNavigation} from 'react-navigation';

class PushNotificationManager extends Component {

  static propTypes = {
    // setPushToken: PropTypes.func.isRequired,
    // onReceiveNotifications: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={{height:500,backgroundColor:'black'}}>

      </View>

    );
  }
}

export default withNavigation(PushNotificationManager);