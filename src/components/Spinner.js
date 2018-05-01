import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import colors from 'theme/colors';

const Spinner = ({style}) => (
  <ActivityIndicator
    size="small"
    animating
    color={colors.primary}
    style={{paddingVertical: 20}}
  />
);

Spinner.propTypes = {
  style: View.propTypes.style,
};

export default Spinner;
