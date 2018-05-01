import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'theme/colors';
import I18n from 'utils/locale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from 'react-native-platform-touchable';

export default class FormCheck extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    // style:PropTypes.object
  };

  render() {
    const {checked, style, onPress, disabled} = this.props;
    return (
      <Touchable
        disabled={disabled}
        onPress={onPress}
        hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}
        style={[styles.label, disabled && {opacity: 0.4}]}>
        {checked ? (
          <MaterialCommunityIcons
            name="checkbox-marked-circle"
            size={30}
            color="green"
            {...style}
            style={styles.icon}
          />
        ) : (
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={30}
            color="green"
            {...style}
            style={styles.icon}
          />
        )}
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 10,
  },
  icon: {
    height: 30,
    width: 30,
  },
});
