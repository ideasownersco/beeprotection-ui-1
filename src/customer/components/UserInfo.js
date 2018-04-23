/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';
import Divider from 'components/Divider';
import Touchable from 'react-native-platform-touchable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UserInfo = ({user, style, makeCall}) => {
  return (
    <View style={[styles.container, style]}>
      <SectionTitle title={I18n.t('customer_information')} />

      <View style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('name')}</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={styles.label}>{I18n.t('email')}</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>

        <Divider style={{marginVertical: 5}} />

        <View style={styles.content}>
          <Text style={[styles.label, {flex: 1}]}>{I18n.t('mobile')}</Text>

          <Touchable onPress={makeCall}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="phone" size={30} color="green" />
              <Text>{user.mobile}</Text>
            </View>
          </Touchable>
        </View>
      </View>
    </View>
  );
};

UserInfo.propTypes = {
  makeCall: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
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
    alignItems: 'center',
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
export default UserInfo;
