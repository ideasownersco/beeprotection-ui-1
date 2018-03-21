import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';

export default class PushNotificationManager extends Component {
  static propTypes = {
    setPushToken: PropTypes.func.isRequired,
    onReceiveNotifications: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  constructor(props) {
    super(props);

    PushNotification.configure({
      onRegister: token => {
        this.props.setPushToken(token);
      },

      onNotification: notification => {
        this.props.onReceiveNotifications(notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}
