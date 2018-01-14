import React, { Component } from 'react';
import {
  Platform,
  StyleSheet, Text,
  View
} from 'react-native';

// import DeviceInfo from 'react-native-device-info';

////
// Import BackgroundGeolocation plugin
// Note: normally you will not specify a relative url ../ here.  I do this in the sample app
// because the plugin can be installed from 2 sources:
//
// 1.  npm:  react-native-background-geolocation
// 2.  private github repo (customers only):  react-native-background-geolocation-android
//
// This simply allows one to change the import in a single file.
import BackgroundGeolocation from "react-native-background-geolocation";
import Button from "components/Button";

const TRACKER_HOST = 'http://tracker.transistorsoft.com/ZaL/';

export default class HelloWorld extends Component<{}> {

  constructor(props) {
    super(props);

    this.eventId = 1;

    this.state = {
      enabled: false,
      isMoving: false,
      username: 'ZaL',
      events: []
    };
  }

  componentDidMount() {
    console.log('componentDidMount');
    // Step 1:  Listen to events:
    this.onLocation = this.onLocation.bind(this);
    BackgroundGeolocation.on('location', this.onLocation);
    // BackgroundGeolocation.on('motionchange', this.onMotionChange.bind(this));
    // BackgroundGeolocation.on('activitychange', this.onActivityChange.bind(this));
    // BackgroundGeolocation.on('providerchange', this.onProviderChange.bind(this));
    // BackgroundGeolocation.on('powersavechange', this.onPowerSaveChange.bind(this));
    // BackgroundGeolocation.on('http', this.onHttp.bind(this));
    // BackgroundGeolocation.on('heartbeat', this.onHeartbeat.bind(this));

    // Step 2:  #configure:
    BackgroundGeolocation.configure({
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      foregroundService: true,
      url: TRACKER_HOST,
      // params: {
      //   // Required for tracker.transistorsoft.com
      //   device: {
      //     uuid: DeviceInfo.getUniqueID(),
      //     model: DeviceInfo.getModel(),
      //     platform: DeviceInfo.getSystemName(),
      //     manufacturer: DeviceInfo.getManufacturer(),
      //     version: DeviceInfo.getSystemVersion(),
      //     framework: 'ReactNative'
      //   }
      // },
      autoSync: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF
    }, (state) => {
      console.log('- Configure success: ', state);
      this.setState({
        enabled: state.enabled,
        isMoving: state.isMoving
      });
    });
  }

  /**
   * @event location
   */
  onLocation(location){
    console.log('[event] location: ', location);
    this.addEvent('location', new Date(location.timestamp), location);
  }
  /**
   * @event motionchange
   */
  onMotionChange(event) {
    console.log('[event] motionchange: ', event.isMovign, event.location);
    this.setState({
      isMoving: event.isMoving
    });
    this.addEvent('motionchange', new Date(event.location.timestamp), event.location);
  }
  /**
   * @event activitychange
   */
  onActivityChange(event) {
    console.log('[event] activitychange: ', event);
    this.addEvent('activitychange', new Date(), event);
  }
  /**
   * @event providerchange
   */
  onProviderChange(event) {
    console.log('[event] providerchange', event);
    this.addEvent('providerchange', new Date(), event);
  }
  /**
   * @event powersavechange
   */
  onPowerSaveChange(isPowerSaveMode) {
    console.log('[event] powersavechange', isPowerSaveMode);
    this.addEvent('powersavechange', new Date(), {isPowerSaveMode: isPowerSaveMode});
  }
  /**
   * @event heartbeat
   */
  onHttp(response) {
    console.log('[event] http: ', response);
    this.addEvent('http', new Date(), response);
  }
  /**
   * @event heartbeat
   */
  onHeartbeat(event) {
    console.log('[event] heartbeat: ', event);
    this.addEvent('heartbeat', new Date(), event);
  }

  onToggleEnabled(value) {
    let enabled = !this.state.enabled;
    this.setState({
      enabled: enabled,
      isMoving: false
    });
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
    }
  }

  onClickGetCurrentPosition() {
    BackgroundGeolocation.getCurrentPosition((location) => {
      console.log('- getCurrentPosition success: ', location);
    }, (error) => {
      console.warn('- getCurrentPosition error: ', error);
    }, {
      persist: true,
      samples: 1,
      maximumAge: 5000
    });
  }

  onClickChangePace() {
    console.log('- onClickChangePace');
    let isMoving = !this.state.isMoving;
    this.setState({isMoving: isMoving});
    BackgroundGeolocation.changePace(isMoving);
  }

  onClickClear() {
    this.setState({events: []});
  }

  /**
   * Add an event to list
   */
  addEvent(name, date, object) {
    let event = {
      key: this.eventId++,
      name: name,
      timestamp: date.toLocaleTimeString(),
      json: JSON.stringify(object, null, 2)
    };
    let rs = this.state.events;
    rs.unshift(event);
    this.setState({
      events: rs
    });
  }

  renderEvents() {
    return null;
    return this.state.events.map((event) => (
      <View key={event.key} style={styles.listItem}>
        <Text style={styles.eventName}>[event] {event.name}</Text>
        <Text style={styles.eventTimestamp}>{event.timestamp}</Text>
        <Text style={styles.eventJson}>{event.json}</Text>
      </View>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.list}>
          {this.renderEvents()}
        </View>

        <Button title="enable" onPress={() => this.onToggleEnabled()}  />
        <Button title="enable" onPress={() => this.onClickChangePace()}  />

      </View>
    );
  }

  /**
   * Navigate back to home-screen app-switcher
   */

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#272727'
  },
  header: {
    backgroundColor: '#fedd1e'
  },
  title: {
    color: '#000'
  },
  // listItem: {
  //   marginBottom: 10
  // },
  itemHeader: {
    backgroundColor: '#D5B601',
    padding: 5
  },
  eventName: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  eventTimestamp: {
    fontSize: 12
  },
  eventJson: {
    fontFamily: 'Courier New',
    fontSize: 12,
    color: '#e6db74'
  },
  footer: {
    backgroundColor: '#fedd1e',
    paddingLeft: 10,
    paddingRight: 10
  },
  footerBody: {
    justifyContent: 'center'
  },
  icon: {
    color: '#fff'
  },
  list:{
    flex:1,
    height:300,
    backgroundColor:'yellow'
  }
});
