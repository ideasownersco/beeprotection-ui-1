/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {Text, View, StyleSheet} from 'react-native';

const SectionTitle = ({containerStyle, titleStyle, title, style}) => {
  return (
    <View style={[style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
});
export default SectionTitle;
