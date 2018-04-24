/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import SectionTitle from 'components/SectionTitle';

export default class DriverThumb extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render() {
    const {name, image} = this.props;
    return (
      <View style={[styles.container]}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{uri: image}} style={styles.image} />
          ) : (
            <Feather name="user" size={60} style={styles.image} />
          )}
        </View>
        <SectionTitle title={name} titleStyle={{padding: 10}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  contentContainer: {
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    textAlign: 'left',
    color: colors.darkGrey,
  },
  value: {
    color: colors.primary,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
  },
});
