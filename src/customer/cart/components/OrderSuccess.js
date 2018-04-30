import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import colors from 'assets/theme/colors';
import {Title} from 'react-native-paper';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import Button from 'components/Button';

export default class OrderSuccess extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.visible !== this.props.visible;
  // }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    cart: PropTypes.object.isRequired,
    total: PropTypes.number.isRequired,
  };

  render() {
    let {visible, onHide, cart, total, onPress} = this.props;
    return (
      <Modal
        isVisible={visible}
        animationType="slide"
        // onBackdropPress={onHide}
        backdropOpacity={0.8}
        transparent={true}
        backdropColor="black"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{flex: 1}}>
        <ScrollView
          style={[styles.container]}
          contentContainer={styles.contentContainer}>
          <View style={{padding: 10, paddingTop: 200}}>
            <Title style={{textAlign: 'center', fontSize: 20}}>
              {I18n.t('thank_you')}
            </Title>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.leftCol}>{I18n.t('order_date')}</View>
            <View style={styles.rightCol}>
              {cart.selectedDate.format('dd-mm-yy')}
            </View>
          </View>

          <Divider />

          <View style={styles.rowContainer}>
            <View style={styles.leftCol}>{I18n.t('order_time')}</View>
            <View style={styles.rightCol}>
              {cart.selectedTime.format('dd-mm-yy')}
            </View>
          </View>

          <Divider />

          <View style={styles.rowContainer}>
            <View style={styles.leftCol}>{I18n.t('total')}</View>
            <View style={styles.rightCol}>{total}</View>
          </View>

          <Button
            color={colors.primary}
            dark
            raised
            onPress={onPress}
            style={{padding: 20}}
            title={I18n.t('home')}
          />
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  centerText: {
    fontSize: 18,
    // paddingVertical: 30,
    color: colors.black,
  },
  centerButton: {
    width: 200,
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 1,
  },
});
