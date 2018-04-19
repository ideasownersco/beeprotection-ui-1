import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import images from 'assets/theme/images';
import Button from 'components/Button';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackgroundGeolocation from 'react-native-background-geolocation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import {API_URL} from 'utils/env';
import AddressInfo from 'components/AddressInfo';

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
    startWorking: PropTypes.func.isRequired,
    stopWorking: PropTypes.func.isRequired,
    startDriving: PropTypes.func.isRequired,
    stopDriving: PropTypes.func.isRequired,
    jobStatus: PropTypes.string,
    address: PropTypes.object.isRequired,
    driverID: PropTypes.number.isRequired,
  };

  static defaultProps = {
    jobStatus: 'pending',
  };

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      enabled: false,
      origin: {
        latitude: this.props.origin.latitude,
        longitude: this.props.origin.longitude,
        heading: 0,
      },
    };
  }

  // shouldComponentUpdate(nextProps,prevState) {
  //   return nextProps.jobStatus !== this.props.jobStatus ||
  //     nextProps.origin.latitude !== nextProps.origin.latitude ||
  //     this.state.initialized !== prevState.initialized
  //     ;
  // }

  componentDidMount() {
    const {jobID, jobStatus, driverID} = this.props;

    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('http', this.onHttp);

    BackgroundGeolocation.configure(
      {
        distanceFilter: 100,
        stopOnTerminate: false,
        preventSuspend: false,
        startOnBoot: true,
        foregroundService: true,
        url: `http://${API_URL}/jobs/${jobID}/update/location`,
        autoSync: true,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        maxRecordsToPersist: 1,
        params: {
          driver_id: driverID,
        },
      },
      state => {
        this.setState({
          enabled: state.enabled && jobStatus === 'driving',
        });
      },
    );

    setTimeout(() => {
      this.setState({
        initialized: true,
      });
    }, 1000);
  }

  componentWillUnmount() {
    BackgroundGeolocation.un('location', this.onLocation);
  }

  onLocation = location => {
    const lastPosition = this.state.origin;
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    };

    if (lastPosition.latitude !== currentLocation.latitude) {
      this.setState({
        origin: {
          ...this.state.origin,
          ...currentLocation,
        },
      });
    }
  };

  onHttp = response => {
    console.log('[event] http: ', response);
  };

  onMapLayout = () => {
    this.map.fitToElements(true);
  };

  reCenterMap = () => {
    this.map.fitToElements(true);
  };

  openInGoogleMaps = () => {
    let {latitude, longitude} = this.props.destination;
    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  };

  startDriving = () => {
    this.map.fitToElements(true);
    if (!this.state.enabled) {
      this.setState({
        enabled: true,
      });
    }
    this.props.startDriving();
    BackgroundGeolocation.start();
  };

  stopDriving = () => {
    this.map.fitToElements(true);
    if (this.state.enabled) {
      this.setState({
        enabled: false,
      });
    }
    this.props.stopDriving();
    BackgroundGeolocation.stop();
  };

  startWorking = () => {
    this.props.startWorking();
  };

  stopWorking = () => {
    this.props.stopWorking();
  };

  uploadImages = () => {
    this.props.uploadImages();
  };

  approveImages = () => {
    this.props.approveImages();
  }

  render() {
    const {destination, jobStatus, address, imagesUploaded, imagesApproved} = this.props;
    console.log('jobStatus', jobStatus);
    const {origin, initialized} = this.state;
    const {heading} = origin;
    const rotate =
      typeof heading === 'number' && heading >= 0 ? `${heading}deg` : undefined;

    return (
      <View style={styles.container}>
        {initialized && (
          <MapView
            // provider={PROVIDER_GOOGLE}
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
              anchor={{x: 0.5, y: 0.5, position: 'relative'}}
              coordinate={origin}
              identifier="MarkerOrigin">
              <Image
                source={images.car}
                style={[styles.image, rotate && {transform: [{rotate}]}]}
              />
            </MapView.Marker>

            <MapView.Marker
              coordinate={destination}
              identifier="MarkerDestination"
            />
          </MapView>
        )}

        <View style={{backgroundColor: 'white'}}>
          <View style={styles.navContainer}>
            <Touchable onPress={this.reCenterMap}>
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons name="arrow-all" size={35}/>
              </View>
            </Touchable>
            <Text style={styles.address}>
              <AddressInfo address={address} style={{textAlign: 'center'}}/>
            </Text>

            <Touchable onPress={this.openInGoogleMaps}>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="ios-navigate-outline" size={35}/>
              </View>
            </Touchable>
          </View>

          {jobStatus == 'pending' && (
            <Button
              title={I18n.t('start_driving')}
              onPress={this.startDriving}
              style={{marginBottom: 10}}
            />
          )}

          {jobStatus == 'driving' && (
            <Button
              title={I18n.t('stop_driving')}
              onPress={this.stopDriving}
              style={{marginBottom: 10}}
            />
          )}

          {jobStatus == 'reached' && (
            <View style={{flexDirection: 'row',justifyContent:'space-around'}}>

              {
                imagesUploaded && imagesApproved &&
                <Button
                  title={I18n.t('start_working')}
                  onPress={this.startWorking}
                  style={{marginBottom: 10,width:150}}
                />
              }

              {
                imagesUploaded && !imagesApproved &&
                <Button
                  title={I18n.t('approve_images')}
                  onPress={this.approveImages}
                  style={{marginBottom: 10, width:150}}
                />
              }

              {

                !imagesUploaded &&
                <Button
                  title={I18n.t('upload_images')}
                  onPress={this.uploadImages}
                  style={{marginBottom: 10, width:150}}
                />
              }

            </View>
          )}

          {jobStatus == 'working' && (
            <Button
              title={I18n.t('stop_working')}
              onPress={this.stopWorking}
              style={{marginBottom: 10}}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
  },
  mapMarker: {},
  image: {
    width: 20,
    height: 40,
  },
  navContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  address: {
    flex: 1,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});
