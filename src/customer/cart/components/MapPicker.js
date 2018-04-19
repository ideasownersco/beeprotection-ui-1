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
    latitude_delta: .1,
    isAreaListModalVisible: false,
    initialized:false
  };

  componentDidMount() {
    setTimeout(()=> {
      this.setState({
        initialized:true
      });
      // this.map.fitToSuppliedMarkers(["MARKER_1"],false);

      let {latitude,longitude} = this.props.address;
      let params = {
        latitude:latitude,
        longitude:longitude
      };
      // this.map.fitToElements(false);

      // this.setState({
      //   latitude_delta:1
      // })
      this.map.fitToCoordinates([params,params], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: false,
      });

    },1000);
  };

  // onItemPress = (locationData, locationDetails) => {
  //
  //   let params = {
  //     latitude: locationDetails.geometry.location.lat,
  //     longitude: locationDetails.geometry.location.lng,
  //     country: 'KW',
  //   };
  //
  //   this.map.fitToCoordinates([params, this.props.address], {
  //     edgePadding: DEFAULT_PADDING,
  //     animated: true,
  //   });
  //
  //   this.props.updateAddress(params);
  // };

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

    // let {latitude, longitude} = region;
    // let params = {
    //   latitude: latitude,
    //   longitude: longitude,
    // };
    // this.props.updateAddress(params);
  };

  mapMarkerRegion = () => {
    let region = ({latitude, longitude} = this.props.address);
    // console.log('mapMarkerRegion', region);
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
    console.log('area', area);
    const {updateAddress, address} = this.props;

    let {latitude, longitude} = area;

    let params = {
      latitude: +latitude.toFixed(4),
      longitude: +longitude.toFixed(4),
      area_id: area.id,
    };

    console.log('paramas',params);


    updateAddress(params);

    // this.map.fitToSuppliedMarkers(["MARKER_1"],false);

    // this.map.fitToElements(true);

    this.map.fitToCoordinates([params], {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });

  };

  render() {
    const {address, initialized, areas} = this.props;

    let area = {};

    if (address.area_id) {
      area = areas.find(area => area.id === address.area_id) || {};
    }

    console.log('state',this.state);
    console.log('mapMarkerCoordinate',this.mapMarkerRegion());

    // console.log('rendered MapPicker', this.props.address);
    // console.log('props', {...this.props.address});

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
          <View style={styles.mapContainer}>
            {initialized && (
              <MapView
                ref={ref => {
                  this.map = ref;
                }}
                // provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  ...address,
                  latitudeDelta: this.state.latitude_delta,
                  longitudeDelta: this.state.latitude_delta * ASPECT_RATIO,
                }}
                onRegionChangeComplete={this.onRegionChange}
                // minZoomLevel={8}
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
