import React, {Component} from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import I18n from 'utils/locale';
import {Title} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Touchable from 'react-native-platform-touchable';
import Divider from 'components/Divider';

export default class FreeWash extends Component {
  makeCall = number => {
    let url = `tel:${number}`;

    return Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Title>BeeProtection</Title>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingTop: 50,
          }}>
          <Text
            style={[styles.title]}
            onPress={() => this.makeCall('98009966')}>
            98009966
          </Text>

          <Touchable onPress={() => this.makeCall('98009966')}>
            <MaterialIcons name="phone" size={30} color="green" />
          </Touchable>
        </View>

        <Divider style={{backgroundColor: 'black', marginVertical: 10}} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <Text
            style={[styles.title]}
            onPress={() => this.makeCall('98009977')}>
            98009977
          </Text>

          <Touchable onPress={() => this.makeCall('98009977')}>
            <MaterialIcons name="phone" size={30} color="green" />
          </Touchable>
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
  title: {
    paddingHorizontal: 10,
  },
});
