import React, {Component} from 'react';
import {View} from 'react-native';

export default class FormContent extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return false;
  // }

  render() {
    const {
      style,
      children
    } = this.props;

    return (
      <View style={[{marginTop: 40, marginHorizontal: 20, padding: 20, borderRadius: 10, backgroundColor: 'white'},style]}>
        {children}
      </View>
    );
  }
}