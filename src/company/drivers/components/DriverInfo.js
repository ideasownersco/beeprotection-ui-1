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

export default class DriverInfo extends Component {
  static propTypes = {
    driver: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.driver !== this.props.driver;
  }

  render() {
    const {driver} = this.props;
    return (
      <View style={[styles.container]}>
        <SectionTitle
          title={I18n.t('driver_information')}
          style={{paddingVertical: 10}}
        />
        <View style={styles.itemContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{driver.user.email}</Text>
        </View>

        <Divider style={{flex: 1}} />

        <View style={styles.itemContainer}>
          <Text style={styles.label}>Mobile</Text>

          <Touchable onPress={this.makeCall}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="phone" size={30} color="green" />
              <Text style={styles.value}>{driver.user.mobile}</Text>
            </View>
          </Touchable>
        </View>

        <Divider style={{flex: 1}} />

        <View style={styles.itemContainer}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>
            {driver.offline ? I18n.t('offline') : I18n.t('online')}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 10,
    // marginVertical: 20,
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
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
