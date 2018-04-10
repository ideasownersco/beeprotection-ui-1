import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Modal, StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import Button from 'components/Button';
import MapPicker from 'customer/cart/components/MapPicker';
import colors from 'assets/theme/colors';
import AddressFormFields from 'customer/cart/components/AddressFormFields';
import BackgroundGeolocation from 'react-native-background-geolocation';

type State = {
  label: string,
  block: string,
  street: string,
  avenue: string,
  building: string,
  latitude: string,
  longitude: string,
  mapPickerVisibility: boolean,
  address: Object,
};

export default class CreateAddressForm extends PureComponent {
  state: State = {
    label: null,
    mapPickerVisibility: false,
    block: '',
    street: '',
    avenue: '',
    building: '',
    city_en: '',
    city_ar: '',
    address_en: '',
    address_ar: '',
    state_en: '',
    state_ar: '',
    country: 'KW',
    latitude: 29.3759,
    longitude: 47.9774,
    initialized: false,
    area_id:null
  };

  componentDidMount() {
    // BackgroundGeolocation.getCurrentPosition(
    //   location => {
    //     let {latitude, longitude} = location.coords;
    //     this.setState({
    //       latitude: latitude,
    //       longitude: longitude,
    //       initialized: true
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       initialized: true
    //     });
    //     console.warn('- getCurrentPosition error: ', error);
    //   },
    //   {
    //     persist: true,
    //     samples: 1,
    //     maximumAge: 5000,
    //   },
    // )

    this.setState({
      initialized:true
    })
  }

  hideScreen = () => {
    this.props.onClose();
  };

  saveAddress = () => {
    this.props.onPress(this.state);
  };

  hideMapPicker = () => {
    this.setState({
      mapPickerVisibility: false,
    });
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  updateAddressFields = (address: object) => {
    this.setState({
      ...this.state.address,
      ...address,
    });
  };

  render() {
    const {visible,areas} = this.props;
    const {block, street, avenue, building, mapPickerVisibility} = this.state;

    return (
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="fullScreen">
        <View style={styles.container}>
          <AddressFormFields
            block={block}
            avenue={avenue}
            street={street}
            building={building}
            updateFields={this.updateFormFields}
          />

          <MapPicker
            onClose={this.hideMapPicker}
            visible={mapPickerVisibility}
            updateAddress={this.updateAddressFields}
            address={{...this.state}}
            initialized={this.state.initialized}
            areas={areas}
          />

          <View style={styles.buttonsContainer}>
            <Button
              title="Save"
              onPress={this.saveAddress}
              style={styles.button}
              background="success"
            />

            <Button
              title={I18n.t('close')}
              onPress={this.hideScreen}
              style={styles.button}
              background="error"
            />
          </View>
        </View>
      </Modal>
    );
  }
}

CreateAddressForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginVertical: 20,
    padding: 10,
    opacity: 1,
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
});
