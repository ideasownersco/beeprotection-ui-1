/**
 * @flow
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';

const OrderTotal = ({total, style}) => {
  return (
    <View style={[styles.container, style]}>
      <SectionTitle title={I18n.t('order_total')} style={{flex: 1}} />
      <Text style={styles.total}>{total} KD</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  total: {
    color: colors.primary,
    fontSize: 22,
    textAlign: 'right',
  },
});
export default OrderTotal;
