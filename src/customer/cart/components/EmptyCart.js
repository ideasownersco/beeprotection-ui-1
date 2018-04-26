import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class EmptyCart extends Component {
  shouldComponentUpdate(nextProps) {
    return false;
  }

  render() {
    return (
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="cart-outline"
          size={200}
          color={colors.primary}
          style={{opacity: 0.6}}
        />
        <Text style={styles.emptyCart}>{I18n.t('cart_empty')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart: {
    fontSize: 30,
    color: colors.darkGrey,
  },
});
