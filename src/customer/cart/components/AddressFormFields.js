import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import FormTextInput from 'components/FormTextInput';
import I18n from 'utils/locale';

export default class AddressFormFields extends PureComponent {
  render() {
    const {block, street, avenue, building, updateFields} = this.props;

    return (
      <View style={styles.addressContainer}>
        <View style={styles.addressField}>
          <Text style={styles.label}>{I18n.t('block')}</Text>
          <FormTextInput
            onChangeText={value => updateFields('block', value)}
            value={block}
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            placeholder={I18n.t('block')}
          />
        </View>

        <View style={styles.addressField}>
          <Text style={styles.label}>{I18n.t('street')} </Text>
          <FormTextInput
            onChangeText={value => updateFields('street', value)}
            value={street}
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            placeholder={I18n.t('street')}
          />
        </View>

        <View style={styles.addressField}>
          <Text style={styles.label}>{I18n.t('avenue')}</Text>
          <FormTextInput
            onChangeText={value => updateFields('avenue', value)}
            value={avenue}
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            placeholder={I18n.t('avenue')}
          />
        </View>

        <View style={styles.addressField}>
          <Text style={styles.label}>{I18n.t('building')}</Text>
          <FormTextInput
            onChangeText={value => updateFields('building', value)}
            value={building}
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            placeholder={I18n.t('building')}
          />
        </View>
      </View>
    );
  }
}

AddressFormFields.propTypes = {
  block: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  avenue: PropTypes.string.isRequired,
  building: PropTypes.string.isRequired,
  updateFields: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
  },
  addressField: {
    flex: 1,
  },
  textInput: {
    backgroundColor: 'white',
    textAlign: 'center',
    marginHorizontal: 2,
  },
});
