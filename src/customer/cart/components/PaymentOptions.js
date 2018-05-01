import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import FormCheck from 'components/FormCheck';

export default class PaymentOptions extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.visible !== this.props.visible;
  // }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    // visible: PropTypes.bool.isRequired,
    // onHide:PropTypes.func.isRequired
  };

  render() {
    let {onPress, selectedItem} = this.props;
    return (
      <View
        style={[
          styles.centerModal,
          styles.listContainer,
          // {
          //   backgroundColor: colors[type],
          // },
        ]}>
        <View style={styles.rowContainer}>
          <FormCheck
            disabled={true}
            checked={selectedItem === 'knet'}
            style={{color: colors.primary}}
          />
          <Text style={[styles.text, {opacity: 0.4}]}>{I18n.t('knet')}</Text>
        </View>
        <View style={styles.rowContainer}>
          <FormCheck
            onPress={() => this.props.onPress('cash')}
            checked={selectedItem === 'cash'}
            style={{color: colors.primary}}
          />
          <Text style={styles.text}>{I18n.t('cash')}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // backgroundColor:'yellow',
    alignItems: 'flex-start',
  },
  rowContainer: {
    // backgroundColor:'blue',
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerModal: {
    backgroundColor: 'white',
    alignItems: 'center',
    // padding:30,
  },
  text: {
    color: 'black',
    fontSize: 22,
  },
  centerText: {
    fontSize: 18,
    paddingVertical: 30,
    color: colors.black,
  },
  centerButton: {
    width: 200,
  },
});
