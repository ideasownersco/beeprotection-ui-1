import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from 'theme/colors';

export default class Separator extends Component {
  static propTyes = {
    style: PropTypes.style,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {style} = this.props;
    return <View style={[styles.container, style]} />;
  }
}

const styles = StyleSheet.create({
  container: {
    height: 0.5,
    backgroundColor: colors.lightGrey,
  },
});
