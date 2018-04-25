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
import {TouchableRipple} from 'react-native-paper';

export default class DriverStartEndTime extends Component {
  static propTypes = {
    driver: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.driver !== this.props.driver;
  }

  render() {
    const {driver, onPress} = this.props;

    return (
      <TouchableRipple onPress={onPress} style={[styles.container]}>
        <View style={styles.itemContainer}>
          <Text style={styles.label}>{I18n.t('timings')}</Text>
          <Text style={styles.value}>
            {driver.start_time} - {driver.end_time}
          </Text>
        </View>
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
