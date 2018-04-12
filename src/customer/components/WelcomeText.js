import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';

export default class WelcomeText extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.subText}>{I18n.t('welcome_to')}</Text>
        <Text style={styles.text}>{I18n.t('app_name')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subText: {
    fontSize: 25,
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '800',
  },
});
