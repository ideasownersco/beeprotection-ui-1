import React, {Component} from 'react';
import {View} from 'react-native';
import colors from 'assets/theme/colors';

export default class FormContainer extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return false;
  // }

  render() {
    const {style, children} = this.props;

    return (
      <View
        style={[
          {flex: 1, backgroundColor: colors.primary, padding: 10},
          style,
        ]}>
        {children}
      </View>
    );
  }
}
