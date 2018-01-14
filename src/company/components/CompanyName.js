/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {Text} from 'react-native';

const CompanyName = ({name, ...props}) => {
  return <Text {...props}>{name}</Text>;
};

CompanyName.propTypes = {
  name: PropTypes.string.isRequired,
};

export default CompanyName;
