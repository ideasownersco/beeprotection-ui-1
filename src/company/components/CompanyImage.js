/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View} from 'react-native';

const CompanyImage = ({image, rounded = false}) => {
  return (
    <Image
      style={[styles.image, rounded && styles.rounded]}
      source={{uri: image}}
      resizeMode="cover"
    />
  );
};

CompanyImage.propTypes = {
  image: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    margin: 5,
    width: 60,
    height: 60,
    backgroundColor: 'white',
  },
  rounded: {
    borderRadius: 30,
  },
});
export default CompanyImage;
