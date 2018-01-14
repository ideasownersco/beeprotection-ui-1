/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'assets/theme/colors';

const BackButton = ({onPress}) => {
  return (
    <Touchable
      onPress={onPress}
      hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
      style={{marginLeft: 10, marginRight: 22, marginVertical: 12}}>
      <Ionicons
        name="ios-arrow-back"
        size={34}
        color={colors.primary}
        style={{width: 15, height: 34}}
      />
    </Touchable>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
