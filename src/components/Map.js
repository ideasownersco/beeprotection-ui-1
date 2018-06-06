import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
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
    cacheEnabled: PropTypes.string,
  };

  static defaultProps = {
    cacheEnabled: false,
  };

  state = {
    initialized: false,
  };

  shouldComponentUpdate(nextProps, prevState) {
    if (
      this.state.initialized !== prevState.initialized ||
      nextProps.origin !== this.props.origin
    ) {
      return true;
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initialized: true,
      });
    }, 1000);
  }

  componentDidUpdate(nextProps) {
    if (this.props.origin.latitude !== nextProps.origin.latitude) {
      if (this.state.initialized) {
        this.map.fitToElements(true);
      }
    }
  }

  onMapLayout = () => {
    if (this.state.initialized) {
      this.map.fitToElements(true);
    }
  };

  render() {
    const {destination, origin, cacheEnabled} = this.props;
    const {initialized} = this.state;
    const {heading} = origin;
    const rotate =
      typeof heading === 'number' && heading >= 0 ? `${heading}deg` : undefined;

    if (initialized) {
      return (
        <View style={styles.container}>
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            style={styles.map}
            initialRegion={{
              ...destination,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            onLayout={this.onMapLayout}
            cacheEnabled={cacheEnabled}>
            <MapView.Marker
              style={styles.mapMarker}
              anchor={{x: 0.5, y: 0.5, position: 'relative'}}
              coordinate={origin}
              identifier="MarkerOrigin">
              <Image
                source={images.logo}
                style={[styles.image, rotate && {transform: [{rotate}]}]}
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

    return null;
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
    width: 30,
    height: 30,
  },
});
