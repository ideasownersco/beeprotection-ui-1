import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet, Text,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import images from 'assets/theme/images';
import Button from "components/Button";
import Touchable from 'react-native-platform-touchable';
import Ionicons from "react-native-vector-icons/Ionicons";
import BackgroundGeolocation from 'react-native-background-geolocation';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends Component {
  static propTypes = {
    origin: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    destination: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
    geolocationOptions: PropTypes.shape({
      enableHighAccuracy: PropTypes.bool,
      timeout: PropTypes.number,
      maximumAge: PropTypes.number,
    }),
    heading: PropTypes.number,
  };

  static defaultProps = {
    geolocationOptions: {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      isMoving: false,
      origin: {
        latitude: this.props.origin.latitude,
        longitude: this.props.origin.longitude,
        heading: 0,
      },
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestPermission(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(granted => {
        if (granted) this.watchLocation();
      });
    } else {
      this.watchLocation();
    }
    BackgroundGeolocation.on('location', this.onLocation);

    BackgroundGeolocation.configure({
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      foregroundService: true,
      url: '',
      autoSync: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF
    }, (state) => {
      console.log('- Configure success: ', state);
      this.setState({
        enabled: state.enabled,
        isMoving: state.isMoving
      });
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  onLocation(location) {
    console.log('[event] location: ', location);
    // this.addEvent('location', new Date(location.timestamp), location);
  }

  watchLocation() {
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log('p', position);

        const myLastPosition = this.state.origin;
        const origin = position.coords;
        if (!isEqual(origin, myLastPosition)) {
          this.setState({origin});
          if (this.map) {
            // this.map.fitToElements(true);
          }
        }
      },
      null,
      this.props.geolocationOptions,
    );

    console.log('watchID', this.watchID);
  }

  onMapLayout = () => {
    this.map.fitToElements(false);
  };

  addEvent = (name, date, object) => {
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
  };

  reCenterMap = () => {
    this.map.fitToElements(false);
  };

  openInGoogleMaps = () => {
    console.log('open in google maps');
  };

  toggleStartStopTrip = () => {
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
  };

  render() {
    const {destination} = this.props;
    const {origin} = this.state;
    const {heading} = this.state.origin;

    // const rotate = `${heading}deg`;
    const rotate = (typeof heading === 'number' && heading >= 0) ? `${heading}deg` : null;

    console.log('s', this.state);

    return (
      <View style={styles.container}>

        <MapView
          provider={PROVIDER_GOOGLE}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          initialRegion={{
            ...destination,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onLayout={this.onMapLayout}>
          <MapView.Marker
            style={styles.mapMarker}
            anchor={{x: 0.5, y: 0.5}}
            coordinate={origin}
            identifier="MarkerOrigin">
            <Image
              source={images.car}
              style={[styles.image, {transform: [{rotate}]}]}
            />
          </MapView.Marker>

          <MapView.Marker
            coordinate={destination}
            identifier="MarkerDestination"
          />
        </MapView>

        <View style={styles.navContainer}>
          <Touchable onPress={this.reCenterMap}>
            <View style={{alignItems: 'center'}}>
              <MaterialCommunityIcons name="arrow-all" size={40}/>
              <Text>Re center</Text>
            </View>
          </Touchable>
          <Text style={styles.address}>Address</Text>

          <Touchable onPress={this.openInGoogleMaps}>
            <View style={{alignItems: 'center'}}>
              <Ionicons name="ios-navigate-outline" size={40}/>
              <Text>Direction</Text>
            </View>
          </Touchable>
        </View>

        <Button
          title="Start Trip"
          onPress={this.toggleStartStopTrip}
          style={
            {
              marginVertical: 10
            }
          }
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapMarker: {
    width: 40,
    height: 100,
    zIndex: 1000
  },
  image: {
    width: 20,
    height: 40,
    zIndex: 10000
  },
  navContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  address: {
    flex: 1,
    paddingHorizontal: 15
  }

});
