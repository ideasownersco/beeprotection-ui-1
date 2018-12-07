import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Alert, Image, StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import MapPicker from 'customer/cart/components/MapPicker';
import colors from 'assets/theme/colors';
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
      country: 'KW',
      latitude: this.props.address.latitude || 29.3759,
      longitude: this.props.address.longitude || 47.9774,
      area_id: null,
    };
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

  updateAddressFields = (address: object) => {
    this.setState(address);
  };

  render() {
    const {latitude, longitude, area_id} = this.state;

    const {savingAddress} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.marker}>
          <Image
            source={require('./../../../assets/images/pin.png')}
            style={styles.image}
            resizeMode="contain"
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
        <MapButtons
          save={this.saveAddress}
          close={this.hideScreen}
          savingAddress={savingAddress}
          style={{
            zIndex: 5000,
            position: 'absolute',
            bottom: 20,
          }}
        />
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
  marker: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    zIndex: 1000,
  },
});
