import React, {Component} from 'react';
import {View} from 'react-native';

export default class FormContainer extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return false;
  // }

  render() {
    const {
      style,
      children
    } = this.props;

    return (
      <View style={[{flex: 1, backgroundColor: '#5096ac', padding: 10},style]}>
        {children}
      </View>
    );
  }
}