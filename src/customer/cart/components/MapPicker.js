/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'assets/theme/colors';
import MapView from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_KEY} from 'utils/env.js';
import I18n, {isRTL} from 'utils/locale';
import Qs from 'qs';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPicker extends Component {
  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
  };
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     this.props.address.latitude !== nextProps.address.latitude ||
  //     this.props.address.longitude !== nextProps.address.longitude ||
  //     this.props.address.address_en !== nextProps.address.address_en
  //   );
  // }

  constructor(props) {
    super(props);
    let {latitude, longitude} = this.props.address;

    this.state = {
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  jumpToRegion = () => {
    const region = this.mapMarkerRegion();
    this.map.animateToRegion(region);
  };

  async geoCode(locationData, lang) {
    const {updateAddress} = this.props;
    let isNeighbourhood = false;
    if (locationData.terms[3]) {
      isNeighbourhood = true;
    }
    let urlParams = Qs.stringify({
      key: GOOGLE_MAPS_KEY,
      placeid: locationData.place_id,
      language: lang,
    });
    let params;
    let city = `city_${lang}`;
    let state = `state_${lang}`;
    let neighborhood = `address_${lang}`;
    try {
      let request = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?${urlParams}`,
      );
      let response = await request.json();
      let {address_components, formatted_address} = response.result;
      params = {
        [neighborhood]: isNeighbourhood
          ? formatted_address
          : address_components[0].long_name,
        [city]: isNeighbourhood
          ? address_components[1].long_name
          : address_components[0].long_name,
        [state]: isNeighbourhood
          ? address_components[2].long_name
          : address_components[1].long_name,
      };
      updateAddress(params);
    } catch (e) {
      params = {
        [neighborhood]: isNeighbourhood
          ? locationData.description
          : locationData.terms[0].value,
        [city]: isNeighbourhood
          ? locationData.terms[1].value
          : locationData.terms[2].value,
        [state]: isNeighbourhood
          ? locationData.terms[2].value
          : locationData.terms[1].value,
      };
      updateAddress(params);
    }
  }

  async reverseGeoCode(coordinates, lang) {
    const {updateAddress} = this.props;
    let {latitude, longitude} = coordinates;

    let isNeighbourhood = false;

    let urlParams = Qs.stringify({
      key: GOOGLE_MAPS_KEY,
      language: lang,
    });
    let city = `city_${lang}`;
    let state = `state_${lang}`;
    let neighborhood = `address_${lang}`;
    try {
      let request = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&${urlParams}`,
      );
      let response = await request.json();
      let {address_components, formatted_address} = response.results[0];
      if (address_components[3]) {
        isNeighbourhood = true;
      }
      let params = {
        [neighborhood]: isNeighbourhood
          ? formatted_address
          : address_components[0].long_name,
        [city]: isNeighbourhood
          ? address_components[1].long_name
          : address_components[0].long_name,
        [state]: isNeighbourhood
          ? address_components[2].long_name
          : address_components[1].long_name,
      };
      updateAddress(params);
    } catch (e) {}
  }

  onItemPress = (locationData, locationDetails) => {
    if (!locationData.terms[2]) {
      alert(I18n.t('please_choose_precise_location'));
    } else {
      let params = {
        latitude: locationDetails.geometry.location.lat,
        longitude: locationDetails.geometry.location.lng,
        country: 'KW',
      };
      this.props.updateAddress(params);
      this.jumpToRegion();
      this.geoCode(locationData, 'en');
      this.geoCode(locationData, 'ar');
    }
  };

  onDragEnd(e) {
    let {latitude, longitude} = e.nativeEvent.coordinate;
    let params = {
      latitude: latitude,
      longitude: longitude,
      country: 'KW',
    };
    this.props.updateAddress(params);
    this.reverseGeoCode({latitude, longitude}, 'en');
    this.reverseGeoCode({latitude, longitude}, 'ar');
  }

  onRegionChange = region => {
    this.setState({region});
  };

  mapMarkerRegion = () => {
    return ({latitude, longitude} = this.props.address);
  };

  render() {
    const {address} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <GooglePlacesAutocomplete
            placeholder={I18n.t('select_area')}
            minLength={1}
            autoFocus={false}
            fetchDetails={true}
            listViewDisplayed={false}
            enablePoweredByContainer={false}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              this.onItemPress(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: 'en',
              components: `country:${address.country}`,
            }}
            styles={autoCompleteStyle}
            placeholderTextColor={colors.lightGrey}
            // getDefaultValue={() => (isRTL ? address.address_ar : address.address_en)}
            text={isRTL ? address.address_ar : address.address_en}
            textInputProps={{
              autoCapitalize: 'none',
              autoCorrect: false,
            }}
          />

          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.jumpToRegion()}
            style={styles.textInput}>
            <Ionicons
              name="ios-paper-plane"
              color={colors.darkGrey}
              size={25}
              style={{
                width: 25,
                height: 25,
                margin: 8,
              }}
            />
          </TouchableHighlight>
        </View>

        <View style={styles.menuContainer}>
          <View style={styles.mapContainer}>
            <MapView
              ref={ref => {
                this.map = ref;
              }}
              provider={this.props.provider}
              style={styles.map}
              initialRegion={this.state.region}
              onRegionChangeComplete={this.onRegionChange}>
              <MapView.Marker
                coordinate={this.mapMarkerRegion()}
                onDragEnd={e => this.onDragEnd(e)}
                draggable
              />
            </MapView>
          </View>
        </View>
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
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  menuContainer: {
    flex: 5,
    padding: 10,
    backgroundColor: 'white',
  },
  mapContainer: {
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
