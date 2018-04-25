import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';
import MapPicker from 'customer/cart/components/MapPicker';
import colors from 'assets/theme/colors';
import AddressFormFields from 'customer/cart/components/AddressFormFields';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {Button} from 'react-native-paper';
import Touchable from 'react-native-platform-touchable';
import List from 'components/List';

export default class extends Component {
  static propTypes = {
    areas: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      label: null,
      mapPickerVisibility: false,
      block: 1,
      street: 1,
      avenue: 1,
      building: 1,
      country: 'KW',
      latitude: 29.3759,
      longitude: 47.9774,
      // latitude:null,
      // longitude:null,
      area_id: null,
      isAreaListModalVisible: false,
      hideMap: false,
    };
  }

  // shouldComponentUpdate(nextProps, prevState) {
  //   return nextProps.items !== this.props.items || prevState !== this.state;
  // }

  componentDidMount() {
    BackgroundGeolocation.getCurrentPosition(
      location => {
        let {latitude, longitude} = location.coords;
        this.setState({
          latitude: latitude,
          longitude: longitude,
          initialized: true,
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

  hideScreen = () => {
    this.props.onCancel();
  };

  saveAddress = () => {
    this.hideMap();
    this.props.onSave({
      ...this.state,
      area_id:99
    });
  };

  hideMap = () => {
    this.setState({
      hideMap: true,
    });
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  // async reverseGeoCode(coordinate) {
  //   let urlParams = `key=${GOOGLE_MAPS_KEY}`;
  //   let request = await fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&${urlParams}`,
  //   );
  //   let response = await request.json();
  //   console.log('res', response);
  // }

  updateAddressFields = (address: object) => {
    this.setState({
      ...this.state.address,
      ...address,
    });
  };

  setArea = area => {
    let {latitude, longitude} = area;
    let params = {
      latitude: latitude,
      longitude: longitude,
      area_id: area.id,
    };
    this.updateAddressFields(params);
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

  render() {
    const {areas} = this.props;

    const {
      latitude,
      longitude,
      block,
      street,
      avenue,
      building,
      area_id,
      mapPickerVisibility,
      isAreaListModalVisible,
    } = this.state;

    console.log('latitude', latitude);
    console.log('longitude', longitude);

    // console.log('state',{...this.state});

    return (
      <View style={styles.container}>

        <AddressFormFields
          block={block}
          avenue={avenue}
          street={street}
          building={building}
          updateFields={this.updateFormFields}
        />

        <View style={styles.mapContainer}>
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
                {area_id
                  ? areas.find(area => area.id === area_id).name
                  : I18n.t('select_area')}
              </Text>
            </Touchable>
          </View>

          {
            !this.state.hideMap &&
            <MapPicker
              updateAddress={this.updateAddressFields}
              address={{
                latitude: latitude,
                longitude: longitude,
                area_id: area_id,
              }}
            />
          }

        </View>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={this.hideScreen}
            style={styles.button}
            background="transparent"
            raised>
            {I18n.t('cancel')}
          </Button>

          <Button
            onPress={this.saveAddress}
            style={styles.button}
            raised
            primary
            dark>
            {I18n.t('save')}
          </Button>
        </View>

        <List
          title={I18n.t('select_area')}
          activeIDs={[area_id]}
          isVisible={isAreaListModalVisible}
          onConfirm={this.setArea}
          onCancel={this.hideAreaListModal}
          onSave={this.hideAreaListModal}
          items={areas}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    marginVertical: 20,
    padding: 10,
    opacity: 1,
    // backgroundColor: colors.fadedWhite,
    backgroundColor: colors.fadedWhite,
  },
  buttonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 0,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  searchInputContainer: {
    position: 'absolute',
    top: 20,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: 5000,
  },
});
