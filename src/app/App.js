import PropTypes from 'prop-types';
import React, {Component} from 'react';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import CodePush from 'react-native-code-push';
import PushNotificationManager from 'app/components/PushNotificationManager';
import Notification from 'app/components/Notification';
import Navigator from 'components/Navigator';
import {SafeAreaView, AppState} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {CODE_PUSH_ENABLED} from 'utils/env';
import {SELECTORS as USER_SELECTOR} from 'guest/common/selectors';
import BackgroundGeolocation from 'react-native-background-geolocation';
import PushNotification from 'react-native-push-notification';
import NavigatorService from 'components/NavigatorService';

class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    if (CODE_PUSH_ENABLED) {
      CodePush.sync();
    }
  }

  componentDidMount() {
    this.props.dispatch(ACTIONS.boot());
    // BackgroundGeolocation.stop();
    // BackgroundGeolocation.removeListeners();
  }

  onLanguageSelect = name => {
    this.props.dispatch(ACTIONS.setLanguage(name));
    this.props.dispatch(ACTIONS.setInstalled(true));
  };

  dismissNotification = () => {
    this.props.dispatch(ACTIONS.dismissNotification());
  };

  logout = () => {
    this.props.dispatch(USER_ACTIONS.logout());
  };

  setPushToken = token => {
    this.props.dispatch(ACTIONS.setPushToken(token));
  };

  onReceivePushNotifications = (notification: object) => {
    // console.log('notification', notification);
    let {foreground, data} = notification;
    let navigation = NavigatorService;

    if (!foreground) {
      // console.log('not foregorund');
      let {type} = data;
      switch (type) {
        case 'job.started':
          // console.log('job.started');
          let {order_id} = data;
          return navigation.navigate('OrderDetail', {
            orderID: order_id,
          });
      }
    }
    //
    // if (
    //   notification.data.type &&
    //   notification.data.type === 'message.created'
    // ) {
    //   if (AppState.currentState === 'background') {
    //     navigateToScene('ChatListScene', {});
    //     navigateToScene('ChatThreadScene', {
    //       thread_id: notification.data.thread_id,
    //       title: '',
    //     });
    //   }
    // }

    // if(notification.)

    // let navigation = NavigatorService;
    // navigation.navigate('UpcomingOrders');
    // navigation.navigate('OrderDetail', {
    //   orderID: 13,
    // });
  };

  render() {
    const {app, notifications, isAuthenticated, userType} = this.props;

    if (!app.booted) return null;

    if (!app.installed) {
      return <LanguageSelectScene onItemPress={this.onLanguageSelect} />;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <Notification
          {...notifications}
          dismissNotification={this.dismissNotification}
        />

        <PushNotificationManager
          setPushToken={this.setPushToken}
          onReceiveNotifications={this.onReceivePushNotifications}
        />

        <Navigator
          isAuthenticated={isAuthenticated}
          userType={userType}
          logout={this.logout}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    notifications: state.notifications,
    isAuthenticated: USER_SELECTOR.isAuthenticated(state),
    userType: USER_SELECTOR.getAuthUserType(state),
  };
}

export default connect(mapStateToProps)(App);
