import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import SectionTitle from 'components/SectionTitle';
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
    padding: 10,
    backgroundColor: colors.lightGrey,
    marginBottom: 5,
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
