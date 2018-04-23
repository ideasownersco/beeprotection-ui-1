import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import AddressesList from 'customer/cart/components/AddressesList';
import CreateAddress from 'customer/cart/components/CreateAddress';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Touchable from 'react-native-platform-touchable';

export default class AddressPicker extends PureComponent {
  // shouldComponentUpdate(nextProps) {
  //   return this.props.addresses !== nextProps.addresses || this.props.activeItemID !== nextProps.activeItemID
  // }

  state = {
    createAddressFormVisibility: false,
  };

  showCreateAddressForm = () => {
    let {isAuthenticated, redirectToLogin} = this.props;

    if (!isAuthenticated) {
      return redirectToLogin();
    }

    this.setState({
      createAddressFormVisibility: true,
    });
  };

  hideCreateAddressForm = () => {
    this.setState({
      createAddressFormVisibility: false,
    });
  };

  saveAddress = (address: Object) => {
    this.hideCreateAddressForm();
    this.props.saveAddress(address);
  };

  render() {
    const {
      addresses,
      onAddressPickerItemPress,
      activeItemID,
      areas,
    } = this.props;
    const {createAddressFormVisibility} = this.state;

    return (
      <View style={styles.container}>
        <Touchable onPress={this.showCreateAddressForm}>
          <View style={styles.buttonContainer}>
            <EvilIcons name="plus" color={colors.primary} size={35} />
            <Text style={styles.buttonText}>{I18n.t('add_address')}</Text>
          </View>
        </Touchable>

        <CreateAddress
          visible={createAddressFormVisibility}
          onPress={this.saveAddress}
          onClose={this.hideCreateAddressForm}
          areas={areas}
        />
      </View>
    );
  }
}

AddressPicker.propTypes = {
  addresses: PropTypes.array.isRequired,
  saveAddress: PropTypes.func.isRequired,
  onAddressPickerItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.oneOfType([PropTypes.number]),
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: colors.white,
    // borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    // paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'flex-start',
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    color: colors.primary,
  },
});
