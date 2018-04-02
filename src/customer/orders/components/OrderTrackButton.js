/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';
import {Button} from 'react-native-paper';

const OrderTrackButton = ({onPress, style, disabled}) => {
  return (
    <Button
      onPress={onPress}
      raised
      color={colors.primary}
      disabled={disabled}
      style={[style, {padding: 10}]}
      dark>
      {I18n.t('track')}
    </Button>
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

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // padding: 10,
    // marginVertical: 10,
    // backgroundColor: 'white',
    // alignItems: 'center',
  },
  total: {
    color: colors.primary,
    fontSize: 22,
    textAlign: 'right',
  },
});
export default OrderTrackButton;
