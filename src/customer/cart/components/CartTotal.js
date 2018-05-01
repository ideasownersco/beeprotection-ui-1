import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export default class CartTotal extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.total !== this.props.total;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.packageItemContainer}>
          <Text style={styles.total}>{I18n.t('total')}</Text>
          <Text style={styles.totalPrice}>{this.props.total} KD</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.lightGrey,
  },
  packageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  total: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});
