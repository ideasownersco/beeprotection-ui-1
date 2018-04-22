/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import MapView from 'react-native-maps';
import {isRTL} from 'utils/locale';
import {GOOGLE_MAPS_KEY} from 'utils/env';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = .1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class MapPicker extends Component {

  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      useCurrentLocation: false,
      initialized: false,
      latitude: props.address.latitude,
      longitude: props.address.longitude
    };
  }

  // shouldComponentUpdate(nextProps, prevState) {
  //   return (
  //     this.state.latitude !== prevState.latitude || this.state.initialized !== prevState.initialized
  //   );
  // }

  componentDidUpdate(nextProps) {
    if(this.state.initialized) {
      if(nextProps.address.latitude !== this.props.latitude) {
        // this.map.animateToRegion(nextProps.address)
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.address.latitude === prevState.latitude) {
      return null;
    }

    return {
      latitude: nextProps.address.latitude,
      longitude: nextProps.address.longitude
    }

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initialized: true
      }, () => {
        // this.reverseGeoCode(this.props.address);
      });
    }, 1000);
  };

  async reverseGeoCode(coordinate) {
    console.log('reverseGeoCode', coordinate);
    // let urlParams = `key=${GOOGLE_MAPS_KEY}`;
    // let request = await fetch(
    //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&${urlParams}`,
    // );
    // let response = await request.json();
    // console.log('res', response);
  }

  updateAddress = (address: object) => {
    console.log('updateAddress', address);
    if (this.state.initialized) {
      this.props.updateAddress(address);
      this.reverseGeoCode(address);
    }
  };

  onDragEnd = (e) => {
    console.log('onDragEnd', e);
    let {latitude, longitude} = e.nativeEvent.coordinate;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };
    this.updateAddress(params);
  };

  onRegionChange = (region) => {
    console.log('region');
    // this.setState({
    //   latitude: region.latitude,
    //   longitude: region.longitude
    // });
  };

  onRegionChangeComplete = (region) => {

    if (!this.state.initialized || this.props.address.latitude === region.latitude) {
      return null;
    }

    let {latitude, longitude} = region;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };

    // this.updateAddress(params);
  };

  render() {

    const {initialized} = this.state;
    const {address} = this.props;

    console.log('rendered new address',address);

    return (
      <View style={[styles.container, !address.area_id && {opacity: .3}]}>
        {initialized && (
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            style={[styles.map,]}
            initialRegion={{
              ...address,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onRegionChange={this.onRegionChange}
            onRegionChangeComplete={this.onRegionChangeComplete}
            showsUserLocation={true}
          >
            <MapView.Marker
              coordinate={this.state}
              onDragEnd={e => this.onDragEnd(e)}
              identifier="MARKER_1"
              draggable
            />
          </MapView>
        )}


      </View>
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  searchInputContainer: {
    position: 'absolute',
    top: 20,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 5000,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  textInput: {
    backgroundColor: 'white',
  },
  textInputWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});
