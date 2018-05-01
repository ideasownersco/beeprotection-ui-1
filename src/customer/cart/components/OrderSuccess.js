import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Touchable from 'react-native-platform-touchable';

export default class OrderSuccess extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    let {onPress} = this.props;
    return (
      <ImageBackground
        source={require('./../../../assets/images/end-bg.png')}
        resizeMode="stretch"
        style={{flex: 1, backgroundColor: '#2D72A8'}}>
        <View style={styles.container}>
          <Text style={styles.thankyou}>{I18n.t('order_confirmed')}</Text>

          <Touchable onPress={onPress}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>
                {I18n.t('view_order').toUpperCase()}
              </Text>
            </View>
          </Touchable>

          <Text style={styles.thankyou}>{I18n.t('thank_you')}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 150,
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
  thankyou: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    padding: 30,
    fontWeight: '700',
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
  buttonContainer: {
    borderRadius: 3,
    width: 300,
    padding: 10,
    borderWidth: 6,
    borderColor: '#62A3D0',
    backgroundColor: '#1c599d',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
});
