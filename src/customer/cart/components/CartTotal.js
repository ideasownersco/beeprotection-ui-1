import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
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
      <View style={styles.itemContainer}>
        <View style={styles.packageItemContainer}>
          <Text style={styles.total}>{I18n.t('total')}</Text>
          <Text style={styles.totalPrice}>{this.props.total} KD</Text>
        </View>
      </View>

    );
  };


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  listContainer: {
    paddingTop: 10,
  },
  itemContainer: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 18,
    color: '#aa2d29',
    fontWeight: 'bold',
  },
  packageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  packageTitle: {
    flex: 4,
    fontSize: 20,
    color: colors.darkGrey,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  packagePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
  },
  serviceTitle: {
    flex: 3,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 40,
  },
  servicePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
  total: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  totalPrice: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});
