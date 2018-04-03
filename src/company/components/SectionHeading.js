import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import SectionTitle from 'components/SectionTitle';
import I18n from 'utils/locale';

export default class SectionHeading extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onButtonPress: PropTypes.func,
    buttonTitle: PropTypes.string,
  };

  render() {
    const {onButtonPress, title, buttonTitle, style} = this.props;
    return (
      <View style={[styles.container, style]}>
        <View style={styles.headerContainer}>
          <SectionTitle title={title} style={styles.sectionTitle} />
          <Text
            style={styles.addDriver}
            onPress={onButtonPress}
            hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}>
            {buttonTitle}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    flex: 1,
  },
  addDriver: {
    color: colors.primary,
    fontSize: 15,
  },
});
