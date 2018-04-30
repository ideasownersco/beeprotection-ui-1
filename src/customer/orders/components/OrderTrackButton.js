/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Button from 'components/Button';

const OrderTrackButton = ({onPress, style, disabled}) => {
  return (
    <Button
      onPress={onPress}
      raised
      color={colors.primary}
      disabled={disabled}
      style={[style, {padding: 10}]}
      dark
      title={I18n.t('track')}
    />
  );
};

OrderTrackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.any,
};

OrderTrackButton.defaultProps = {
  disabled: false,
};

export default OrderTrackButton;
