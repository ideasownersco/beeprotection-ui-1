import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'theme/colors';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';

export default class AddressInfo extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.address !== this.props.address;
  }

  static propTypes = {
    address: PropTypes.object.isRequired,
  };

  render() {
    const {area, block, street, avenue, building, style} = this.props.address;

    return (
      <Text style={[styles.value, style]}>
        {area && <Text>{area.name + ', '}</Text>}

        <Text>
          {I18n.t('block')} {block},{' '}
        </Text>
        <Text>
          {I18n.t('street')} {street},{' '}
        </Text>
        {avenue && (
          <Text>
            {I18n.t('avenue')} {avenue},{' '}
          </Text>
        )}
        {building && (
          <Text>
            {I18n.t('building')} {building}
          </Text>
        )}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  value: {
    color: colors.primary,
  },
});
