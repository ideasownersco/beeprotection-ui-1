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
import {Title} from "react-native-paper";

export default class extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      label: null,
      block: null,
      street: null,
      avenue: null,
      building: null,
    };
  }

  hideScreen = () => {
    this.props.onCancel();
  };

  saveAddress = () => {

    this.props.onSave(this.state);

    // return Alert.alert(
    //   `${I18n.t('confirm_location')}`,
    //   `${I18n.t('confirm_location_confirmation')}`,
    //   [
    //     {text: I18n.t('cancel')},
    //     {
    //       text: I18n.t('yes'),
    //       onPress: () => {
    //         this.props.onSave(this.state);
    //       },
    //     },
    //   ],
    // );
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  updateAddressFields = (address: object) => {
    this.setState(address);
  };

  // setArea = area => {
  //   let {latitude, longitude} = area;
  //   let params = {
  //     latitude: latitude,
  //     longitude: longitude,
  //     area_id: area.id,
  //   };
  //   this.updateAddressFields(params);
  // };

  render() {

    const {
      block,
      street,
      avenue,
      building,
      area_id,
    } = this.state;

    return (
      <View style={styles.container}>
          {/*<SelectArea setArea={this.setArea} items={areas} area_id={area_id} />*/}
          {/*<Divider />*/}
          <Title style={{textAlign:'center'}}>Salwa</Title>

          <AddressFormFields
            block={block}
            avenue={avenue}
            street={street}
            building={building}
            updateFields={this.updateFormFields}
          />

        <MapButtons save={this.saveAddress} close={this.hideScreen} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    paddingTop:50
  },
  searchInputWrapper: {
  },
  searchInputContainer: {
    flexDirection: 'row',
  },
});
