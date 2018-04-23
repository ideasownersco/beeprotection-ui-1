import React, {Component} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {
  Paragraph,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogScrollArea,
  Title,
  Caption,
} from 'react-native-paper';
import I18n from 'utils/locale';
import AddressInfo from 'components/AddressInfo';
import colors from 'assets/theme/colors';

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

    console.log('props', this.props);

    return (
      <Dialog
        onDismiss={close}
        visible={visible}
        dismissable={false}
        style={disabled && {opacity: 0.4}}>
        <DialogTitle>{I18n.t('order_details')}</DialogTitle>
        <DialogScrollArea style={[{maxHeight: 220, paddingHorizontal: 0}]}>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            {date && (
              <View style={styles.rowContainer}>
                <Caption style={{flex: 1}}>{I18n.t('date')}</Caption>
                <Text style={styles.value}>{date.format('DD-MM-Y')}</Text>
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

            {address && (
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
            )}

            <View style={styles.rowContainer}>
              <Caption style={{flex: 1}}>{I18n.t('amount')}</Caption>
              <Text style={styles.value}>{total} KD</Text>
            </View>
          </ScrollView>
        </DialogScrollArea>
        <DialogActions>
          <Button primary onPress={close} disabled={disabled}>
            {I18n.t('cancel')}
          </Button>

          <Button primary onPress={checkout} disabled={disabled}>
            {I18n.t('checkout')}
          </Button>
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
