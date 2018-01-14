import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';

export default class PushNotificationManager extends Component {
  static propTypes = {
    setPushToken: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    PushNotification.configure({
      onRegister: token => {
        this.props.setPushToken(token);
      },
      onNotification: function(notification) {},

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
