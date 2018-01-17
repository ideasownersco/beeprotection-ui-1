import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Image, Linking, StyleSheet, View,} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import images from 'assets/theme/images';

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
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     origin: {
  //       latitude: this.props.origin.latitude,
  //       longitude: this.props.origin.longitude,
  //       heading: this.props.origin.heading,
  //     },
  //   };
  // }

  onMapLayout = () => {
    this.map.fitToElements(true);
  };

  reCenterMap = () => {
    this.map.fitToElements(true);
  };

  openInGoogleMaps = () => {
    this.openMaps();
  };

  openMaps() {
    let {latitude, longitude} = this.props.destination;

    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  }


  render() {
    const {destination} = this.props;
    const {origin} = this.props;
    const {heading} = origin;
    const rotate =
      typeof heading === 'number' && heading >= 0 ? `${heading}deg` : null;
    return (
      <View style={styles.container}>
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
              style={[styles.image, {transform: [{rotate}]}]}
            />
          </MapView.Marker>

          <MapView.Marker
            coordinate={destination}
            identifier="MarkerDestination"
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  map: {
    flex: 1,
  },
  mapMarker: {
    // width: 80,
    // height: 160,
    // backgroundColor:'transparent',
  },
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
    textAlign:'center'
  },
});
