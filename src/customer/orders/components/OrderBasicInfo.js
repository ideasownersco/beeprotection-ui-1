/**
 * @flow
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';
import Divider from 'components/Divider';
import AddressInfo from 'components/AddressInfo';

const OrderBasicInfo = ({item, onPress, style}) => {
  return (
    <View style={[styles.container, style]}>
      <SectionTitle title="Basic Information" />

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('order_no')}</Text>
          <Text style={styles.value}>{item.id}</Text>
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('invoice')}</Text>
          <Text style={styles.value}>{item.invoice}</Text>
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('requested_date')}</Text>
          <Text style={styles.value}>
            {item.date}, {item.time}
          </Text>
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('address')}</Text>

          <AddressInfo
            address={item.address}
            style={{flex: 1, textAlign: 'right'}}
          />
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('payment_mode')}</Text>
          <Text style={[styles.value]}>{item.payment_mode}</Text>
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('job_status')}</Text>
          <Text style={[styles.value]}>
            {item.job ? item.job.status : I18n.t('pending')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  contentContainer: {
    marginVertical: 10,
  },
  content: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  label: {
    // flex: 1,
    textAlign: 'left',
    color: colors.darkGrey,
  },
  addressLabel: {
    textAlign: 'left',
    color: colors.darkGrey,
  },
  value: {
    flex: 1,
    color: colors.primary,
    textAlign: 'right',
  },
});
export default OrderBasicInfo;
