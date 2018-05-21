import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Alert} from 'react-native';
import I18n from 'utils/locale';
import MapPicker from 'customer/cart/components/MapPicker';
import colors from 'assets/theme/colors';
import AddressFormFields from 'customer/cart/components/AddressFormFields';
import BackgroundGeolocation from 'react-native-background-geolocation';
import Divider from 'components/Divider';
import SelectArea from 'customer/cart/components/SelectArea';
import MapButtons from 'customer/cart/components/MapButtons';

export default class extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      label: null,
      mapPickerVisibility: false,
      block: null,
      street: null,
      avenue: null,
      building: null,
      country: 'KW',
      latitude: 29.3759,
      longitude: 47.9774,
      area_id: null,
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
      error => {},
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
    return Alert.alert(
      `${I18n.t('confirm_location')}`,
      `${I18n.t('confirm_location_confirmation')}`,
      [
        {text: I18n.t('cancel')},
        {
          text: I18n.t('yes'),
          onPress: () => {
            this.props.onSave(this.state);
          },
        },
      ],
    );
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  updateAddressFields = (address: object) => {
    this.setState(address);
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
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.searchInputWrapper}>
          <SelectArea setArea={this.setArea} items={areas} area_id={area_id} />
          <Divider />
          <AddressFormFields
            block={block}
            avenue={avenue}
            street={street}
            building={building}
            updateFields={this.updateFormFields}
          />
        </View>

        <MapPicker
          updateAddress={this.updateAddressFields}
          address={{
            latitude: latitude,
            longitude: longitude,
            area_id: area_id,
          }}
        />

        <MapButtons save={this.saveAddress} close={this.hideScreen} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    opacity: 1,
    backgroundColor: colors.fadedWhite,
  },
  searchInputWrapper: {
    zIndex: 5000,
    top: 20,
    margin: 10,
    marginTop: 40,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  searchInputContainer: {
    flexDirection: 'row',
  },
});
