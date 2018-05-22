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
import {Title} from 'react-native-paper';

export default class extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let {block, street, avenue, building} = this.props.address;

    this.state = {
      label: 'Home',
      block: block,
      street: street,
      avenue: avenue,
      building: building,
    };
  }

  hideScreen = () => {
    this.props.onCancel();
  };

  saveAddress = () => {
    this.props.onSave({
      ...this.state,
      id: this.props.address.id,
      area_id: this.props.address.area.id,
    });
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const {block, street, avenue, building, label} = this.state;
    let {area} = this.props.address;
    return (
      <View style={styles.container}>
        <Title style={{textAlign: 'center'}}>{area.name}</Title>
        <Divider style={{marginVertical: 10}} />
        <AddressFormFields
          block={block}
          avenue={avenue}
          street={street}
          building={building}
          label={label}
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
    padding: 10,
    paddingTop: 50,
  },
  searchInputWrapper: {},
  searchInputContainer: {
    flexDirection: 'row',
  },
});
