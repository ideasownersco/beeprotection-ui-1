import PropTypes from 'prop-types';
import React, {Component} from 'react';
import LanguageSelectScene from 'app/scenes/LanguageSelectScene';
import CodePush from 'react-native-code-push';
import PushNotificationManager from 'app/components/PushNotificationManager';
import Notification from 'app/components/Notification';
import Navigator from 'components/Navigator';
import {SafeAreaView,AppState} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from 'app/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {CODE_PUSH_ENABLED} from 'utils/env';
import {SELECTORS as USER_SELECTOR} from 'guest/common/selectors';
import BackgroundGeolocation from 'react-native-background-geolocation';
import PushNotification from 'react-native-push-notification';
class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (CODE_PUSH_ENABLED) {
      CodePush.sync();
    }
    this.props.dispatch(ACTIONS.boot());
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeListeners();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (5 * 1000));
      // PushNotification.localNotificationSchedule({
      //   message: "My Notification Message",
      //   date:date,
      // });
    }
  }

  onLanguageSelect = name => {
    this.props.dispatch(ACTIONS.setLanguage(name));
    this.props.dispatch(ACTIONS.setInstalled(true));
  };

  setPushToken = token => {
    this.props.dispatch(ACTIONS.setPushToken(token));
  };

  dismissNotification = () => {
    this.props.dispatch(ACTIONS.dismissNotification());
  };

  logout = () => {
    this.props.dispatch(USER_ACTIONS.logout());
  };


  render() {
    const {app, isAuthenticated, userType} = this.props;

    if (!app.booted) return null;

    if (!app.installed) {
      return <LanguageSelectScene onItemPress={this.onLanguageSelect} />;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        {app.notifications.message && (
          <Notification
            message={app.notifications.message}
            messageType={app.notifications.messageType}
            dismissNotification={this.dismissNotification}
          />
        )}

        <PushNotificationManager setPushToken={this.setPushToken} />

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
    isAuthenticated: USER_SELECTOR.isAuthenticated(state),
    userType: USER_SELECTOR.getAuthUserType(state),
  };
}

export default connect(mapStateToProps)(App);
