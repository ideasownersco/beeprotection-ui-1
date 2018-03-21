/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import CompanyName from 'company/components/CompanyName';
import CompanyImage from 'company/components/CompanyImage';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';
import Separator from '../../../components/Separator';

const OrderBasicInfo = ({item, onPress, style}) => {
  return (
    <View style={[styles.container, style]}>
      <SectionTitle title="Basic Information" />

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('order_no')}</Text>
          <Text style={styles.value}>{item.id}</Text>
        </View>

        <Separator style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('requested_date')}</Text>
          <Text style={styles.value}>{item.date}</Text>
        </View>

        <Separator style={{marginVertical: 5}} />

        {item.address &&
          item.address.length && (
            <View style={styles.content}>
              <Text style={styles.label}>{I18n.t('address')}</Text>

              <Text style={[styles.value]}>
                <Text>{item.address.city + ','}</Text>
                <Text>
                  {' '}
                  {I18n.t('block')} {item.address.block},{' '}
                </Text>
                <Text>
                  {' '}
                  {I18n.t('street')} {item.address.street},{' '}
                </Text>
                {item.avenue && (
                  <Text>
                    {I18n.t('avenue')} {item.address.avenue},{' '}
                  </Text>
                )}
                <Text>
                  {I18n.t('building')} {item.address.building}
                </Text>
              </Text>
            </View>
          )}
      </View>
    </View>
  );
};

OrderBasicInfo.propTypes = {
  // item: PropTypes.object.isRequired,
  // onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 20,
    backgroundColor: 'white',
  },
  contentContainer: {
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
export default OrderBasicInfo;
