import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class SettingsScene extends Component {
  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text
          style={{textAlign: 'center', fontSize: 40}}
          onPress={() => this.props.navigation.navigate('CreateOrder')}>
          Settings
        </Text>
      </View>
    );
  }
}
