import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from 'utils/locale';
import Button from 'components/Button';
import {Title} from 'react-native-paper';
import {Colors} from 'react-native-paper';

export default class FreeWash extends Component {
  render() {
    let {onPress, close} = this.props;
    return (
      <View style={styles.container}>
        <Title>{I18n.t('get_free_wash')} !!!</Title>
        <View style={styles.buttonContainer}>
          <Button
            style={{backgroundColor: Colors.teal100}}
            raised
            primary
            dark
            title={I18n.t('close')}
            onPress={close}
          />
          <Button
            raised
            primary
            dark
            title={I18n.t('proceed')}
            onPress={onPress}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  subText: {
    fontSize: 25,
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '800',
  },
  buttonContainer: {
    paddingTop: 30,
    flexDirection: 'row',
  },
});
