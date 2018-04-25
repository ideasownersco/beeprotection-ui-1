/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import MapView from 'react-native-maps';
import {isRTL} from 'utils/locale';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPicker extends Component {
  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      useCurrentLocation: false,
      latitude: null,
      longitude: null,
    };
  }

  shouldComponentUpdate(nextProps, prevState) {
    return (
      nextProps.address.area_id !== this.props.address.area_id ||
      this.state.latitude != prevState.latitude
    );
  }

  componentDidUpdate(nextProps, prevState) {
    if (nextProps.address.area_id !== this.props.address.area_id) {
      this.map.animateToRegion(this.state);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.address.latitude === prevState.latitude) {
      return null;
    }
    return {
      latitude: nextProps.address.latitude,
      longitude: nextProps.address.longitude,
    };
  }

  updateAddress = (address: object) => {
    if (this.state.initialized) {
      this.props.updateAddress(address);
    }
  };

  onDragEnd = e => {
    let {latitude, longitude} = e.nativeEvent.coordinate;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };
    this.updateAddress(params);
  };

  // onRegionChange = region => {
  //   this.setState({
  //     latitude: region.latitude,
  //     longitude: region.longitude,
  //   });
  // };

  onRegionChangeComplete = region => {
    if (
      !this.props.address.area_id ||
      this.props.address.latitude === region.latitude
    ) {
      return null;
    }
    let {latitude, longitude} = region;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };
    this.updateAddress(params);
  };

  render() {
    const {latitude, longitude} = this.state;
    const {address} = this.props;
    // !address.area_id && {opacity: 0.3}

    console.log('latitude in map', latitude);
    console.log('longitude in map', longitude);
    return (
      <MapView
        ref={ref => {
          this.map = ref;
        }}
        style={[styles.map]}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        onRegionChangeComplete={this.onRegionChangeComplete}
        showsUserLocation={true}
        pitchEnabled={false}
        rotateEnabled={false}
        showsMyLocationButton={true}
      >

        <Image
          source={require('./../../../assets/images/pin.png')}
          style={styles.image}
          resizeMode="contain"
        />

      </MapView>
    );
  }
}

const autoCompleteStyle = {
  textInputContainer: {
    margin: 0,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 70000,
  },
  textInput: {
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: '400',
    textAlign: isRTL ? 'right' : 'left',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  description: {
    textAlign: 'left',
  },
  row: {
    backgroundColor: 'white',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  image: {
    width: 50, height: 50,
    alignSelf: 'center'
  }
});
