import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import FormTextInput from 'components/FormTextInput';
import I18n from 'utils/locale';

export default class AddressFormFields extends PureComponent {
  static propTypes = {
    block: PropTypes.string,
    street: PropTypes.string,
    avenue: PropTypes.string,
    building: PropTypes.string,
    updateFields: PropTypes.func.isRequired,
  };

  render() {
    const {block, street, avenue, building, updateFields, label} = this.props;

    return (
      <View style={styles.addressContainer}>
        <View style={styles.addressField}>
          <FormTextInput
            onValueChange={updateFields}
            value={label}
            field="label"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('label')}
          />
        </View>

        <View style={styles.addressField}>
          <FormTextInput
            onValueChange={updateFields}
            value={block}
            field="block"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('block')}
          />
        </View>

        <View style={[styles.addressField]}>
          <FormTextInput
            onValueChange={updateFields}
            value={street}
            field="street"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('street')}
            multiline
          />
        </View>

        <View style={styles.addressField}>
          <FormTextInput
            onValueChange={updateFields}
            value={avenue}
            field="avenue"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('avenue')}
          />
        </View>

        <View style={styles.addressField}>
          <FormTextInput
            onValueChange={updateFields}
            value={building}
            field="building"
            maxLength={40}
            keyboardType="numeric"
            autoFocus={false}
            style={styles.textInput}
            label={I18n.t('building')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
  addressContainer: {
    // flexDirection: 'row',
  },
  addressField: {
    paddingHorizontal: 5,
    marginHorizontal: 1,
  },
  textInput: {},
});
