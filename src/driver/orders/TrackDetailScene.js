/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/selectors/orders';
import {Linking, View} from 'react-native';
import Map from 'components/Map';
import MapButtons from 'driver/orders/components/MapButtons';
import {API_URL, GEOLOCATION_SOUNDS_ENABLED} from 'utils/env';

class TrackOrderScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number,
        }),
      }),
    }).isRequired,
  };

  state = {
    initialized: false,
    tracking_enabled: false,
    // latitude: 37.78825,
    // longitude: -122.4324,
    latitude: 29.3772392006689,
    longitude: 47.98511826155676,
    heading: 0,
  };

  componentDidMount() {
    let {order, profile} = this.props;
    let {job} = order;

    this.props.dispatch(
      DRIVER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );

    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('http', this.onHttp);

    BackgroundGeolocation.configure(
      {
        distanceFilter: 100,
        stopOnTerminate: false,
        preventSuspend: false,
        startOnBoot: true,
        foregroundService: true,
        url: `http://${API_URL}/jobs/${job.id}/update/location`,
        autoSync: true,
        debug: GEOLOCATION_SOUNDS_ENABLED,
        logLevel: GEOLOCATION_SOUNDS_ENABLED
          ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
          : BackgroundGeolocation.LOG_LEVEL_OFF,
        maxRecordsToPersist: 1,
        params: {
          driver_id: profile.id,
        },
      },
      state => {
        this.setState({
          tracking_enabled: job.status === 'driving',
        });
      },
    );

    BackgroundGeolocation.getCurrentPosition(
      location => {
        let {latitude, longitude} = location.coords;
        this.setState({
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {
        console.warn('- getCurrentPosition error: ', error);
      },
      {
        persist: true,
        samples: 1,
        maximumAge: 5000,
      },
    );
  }

  componentWillUnmount() {
    BackgroundGeolocation.un('location', this.onLocation);
  }

  onLocation = location => {
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    });
  };

  onHttp = response => {
    // console.log('[event] http: ', response);
  };

  startDriving = () => {
    if (!this.state.tracking_enabled) {
      this.setState({
        tracking_enabled: true,
      });
    }
    let {job} = this.props.order;
    BackgroundGeolocation.start();
    this.props.dispatch(DRIVER_ACTIONS.startDriving(job.id));
  };

  stopDriving = () => {
    if (this.state.tracking_enabled) {
      this.setState({
        tracking_enabled: false,
      });
    }
    let {job} = this.props.order;
    BackgroundGeolocation.stop();
    this.props.dispatch(DRIVER_ACTIONS.stopDriving(job.id));
  };

  startWorking = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.startWorking(job.id));
  };

  stopWorking = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.stopWorking(job.id));
  };

  onUpdateLocation = () => {
    // let {job} = this.props.navigation.state.params.order;
  };

  openInGoogleMaps = () => {
    let {address} = this.props.order;
    let {latitude, longitude} = address;
    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  };

  render() {
    let {order} = this.props;

    if (!order.id) {
      return null;
    }

    let {address, job} = order;
    let {latitude, longitude, heading} = this.state;

    return (
      <View style={{flex: 1}}>
        <Map
          origin={{
            latitude: latitude,
            longitude: longitude,
            heading: heading,
          }}
          destination={{
            latitude: address.latitude,
            longitude: address.longitude,
          }}
          updateLocation={this.onUpdateLocation}
        />

        <MapButtons
          address={address}
          onDirectionPress={this.openInGoogleMaps}
          startDriving={this.startDriving}
          stopDriving={this.stopDriving}
          startWorking={this.startWorking}
          stopWorking={this.stopWorking}
          jobStatus={job.status}
        />
      </View>
    );
  }
}

const makeMapStateToProps = () => {
  let getOrderByID = DRIVER_SELECTORS.getOrderByID();

  return function mapStateToProps(state, ownProps) {
    return {
      profile: AUTH_SELECTORS.getAuthUserProfile(state),
      order: getOrderByID(state, ownProps.navigation.state.params.orderID),
    };
  };
};

export default connect(makeMapStateToProps)(TrackOrderScene);
