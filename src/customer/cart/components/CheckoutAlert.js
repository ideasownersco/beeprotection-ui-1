import React, {Component} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import {
  Caption,
  Colors,
  Dialog,
  DialogActions,
  DialogScrollArea,
  DialogTitle,
} from 'react-native-paper';
import I18n from 'utils/locale';
import AddressInfo from 'components/AddressInfo';
import colors from 'assets/theme/colors';
import Button from 'components/Button';

const isIOS = Platform.OS === 'ios';

export default class CheckoutAlert extends Component {
  render() {
    let {
      close,
      visible,
      checkout,
      date,
      time,
      total,
      address,
      disabled,
    } = this.props;

    return (
      <Dialog
        onDismiss={close}
        visible={visible}
        dismissable={false}
        // style={disabled && {opacity: 0.4}}
      >
        <DialogTitle>{I18n.t('order_details')}</DialogTitle>
        <DialogScrollArea style={[{maxHeight: 220, paddingHorizontal: 0}]}>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            {date && (
              <View style={styles.rowContainer}>
                <Caption style={{flex: 1}}>{I18n.t('date')}</Caption>
                <Text style={styles.value}>
                  {date.format('ddd')} {date.format('DD-MM-Y')}
                </Text>
              </View>
            )}

            {time && (
              <View style={styles.rowContainer}>
                <Caption style={{flex: 1}}>{I18n.t('time')}</Caption>
                <Text style={styles.value}>
                  {time.name_short} {time.period}
                </Text>
              </View>
            )}

            {address && address.area ? (
              <View style={styles.rowContainer}>
                <Caption style={{flex: 1}}>{I18n.t('address')}</Caption>
                <View
                  style={{
                    flex: 3,
                    paddingHorizontal: 10,
                    alignItems: 'flex-end',
                  }}>
                  <AddressInfo
                    address={address}
                    style={{textAlign: 'center'}}
                  />
                </View>
              </View>
            ) : (
              <View />
            )}

            <View style={styles.rowContainer}>
              <Caption style={{flex: 1}}>{I18n.t('amount')}</Caption>
              <Text style={styles.value}>{total} KD</Text>
            </View>
          </ScrollView>
        </DialogScrollArea>

        <DialogActions>
          <Button
            primary
            onPress={close}
            disabled={disabled}
            title={I18n.t('cancel')}
            color={Colors.grey400}
          />

          {disabled ? (
            <ActivityIndicator
              color={Colors.indigo500}
              size={isIOS ? 'large' : 48}
              style={{marginRight: 16}}
            />
          ) : (
            <Button
              primary
              onPress={checkout}
              disabled={disabled}
              title={I18n.t('checkout')}
              color={Colors.teal500}
            />
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    color: colors.primary,
  },
});
