/**
 * @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import I18n, {isRTL} from 'utils/locale';
import Touchable from 'react-native-platform-touchable';
import List from 'components/List';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const DEFAULT_PADDING = {top: 50, right: 50, bottom: 50, left: 50};

const LATITUDE_DELTA = .1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapPicker extends Component {

  static propTypes = {
    updateAddress: PropTypes.func.isRequired,
    address: PropTypes.object.isRequired,
    areas: PropTypes.array.isRequired,
  };

  // shouldComponentUpdate(nextProps, prevState) {
  //   return (
  //     this.props.address.latitude !== nextProps.address.latitude ||
  //     this.props.address.address_en !== nextProps.address.address_en,
  //     this.state.isAreaListModalVisible !== prevState.isAreaListModalVisible
  //   );
  // }

  state = {
    isAreaListModalVisible: false,
    initialized:false
  };

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        initialized:true
      });
    },1000);
  };

  onDragEnd(e) {
    let {latitude, longitude} = e.nativeEvent.coordinate;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };
    this.props.updateAddress(params);
  }

  onRegionChange = region => {

    if(!this.state.initialized) {
      return null;
    }

    let {latitude, longitude} = region;
    let params = {
      latitude: latitude,
      longitude: longitude,
    };

    this.props.updateAddress(params);
  };

  mapMarkerRegion = () => {
    let region = ({latitude, longitude} = this.props.address);
    return region;
  };

  onAreaButtonPress = () => {
    this.setState({
      isAreaListModalVisible: true,
    });
  };

  hideAreaListModal = () => {
    this.setState({
      isAreaListModalVisible: false,
    });
  };

  setArea = area => {
    let {latitude, longitude} = area;
    let params = {
      latitude: latitude,
      longitude: longitude,
      area_id: area.id,
    };
    this.map.animateToCoordinate(params,500);
    this.props.updateAddress(params);
  };

  render() {
    const {initialized} = this.state;
    const {address, areas} = this.props;
    console.log('address',address);
    let area = {};
    if (address.area_id) {
      area = areas.find(area => area.id === address.area_id) || {};
    }

    return (
      <View style={styles.container}>
        <View style={styles.searchInputContainer}>
          <Touchable
            style={{
              flex: 1,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={this.onAreaButtonPress}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: 'black',
              }}>
              {area.id ? area.name : I18n.t('select_area')}
            </Text>
          </Touchable>
        </View>

        <View style={styles.menuContainer}>
          <View style={[styles.mapContainer,!address.area_id && {opacity:.3}]}>
            {initialized && (
              <MapView
                ref={ref => {
                  this.map = ref;
                }}
                // provider="google"
                // provider={PROVIDER_GOOGLE}
                style={[styles.map,]}
                initialRegion={{
                  ...address,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                onRegionChangeComplete={this.onRegionChange}
              >
                <MapView.Marker
                  coordinate={this.mapMarkerRegion()}
                  onDragEnd={e => this.onDragEnd(e)}
                  identifier="MARKER_1"
                  draggable
                />
              </MapView>
            )}

            <List
              title={I18n.t('select_area')}
              activeIDs={[address.area_id]}
              isVisible={this.state.isAreaListModalVisible}
              onConfirm={this.setArea}
              onCancel={this.hideAreaListModal}
              onSave={this.hideAreaListModal}
              items={areas}
            />
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
