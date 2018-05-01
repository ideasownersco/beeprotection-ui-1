import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';

export default class PaymentPage extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.visible !== this.props.visible;
  // }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    let {visible, onHide} = this.props;
    return (
      <View style={[styles.centerModal]}>
        <Text style={[styles.text, styles.centerText]}>Payment Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
  centerModal: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 50,
    // padding:30,
  },
  text: {
    color: 'white',
    fontSize: 25,
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
