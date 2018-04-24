/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import SectionTitle from 'components/SectionTitle';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import Touchable from 'react-native-platform-touchable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class DriverStartEndTimeModal extends Component {
  static propTypes = {
    driver: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.driver !== this.props.driver;
  }

  render() {
    const {driver} = this.props;
    // return (
    //
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
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
});
