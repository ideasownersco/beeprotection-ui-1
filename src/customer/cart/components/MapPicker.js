/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View,Image} from 'react-native';
import MapView from 'react-native-maps';
// import Svg,{Image} from "react-native-svg";

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPicker extends Component {

  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
  };

  state = {
    imageLoaded:false
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.address.area_id !== this.props.address.area_id;
  }

  componentDidUpdate(nextProps) {
    if (nextProps.address.area_id !== this.props.address.area_id) {
      this.map.animateToRegion(this.props.address);
    }
  }

  updateAddress = (address: object) => {
    this.props.updateAddress(address);
  };

  onRegionChangeComplete = region => {
    let {latitude, longitude} = region;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };
    this.updateAddress(params);
  };

  forceUpdate = () => {
    this.setState({
      imageLoaded:true
    });
  };

  render() {
    const {latitude, longitude} = this.props.address;

    return (
      <View style={{flex:1}}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={[styles.container]}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          onRegionChangeComplete={this.onRegionChangeComplete}
          showsUserLocation={true}
          pitchEnabled={false}
          rotateEnabled={false}>
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    zIndex:10000
  },
});
