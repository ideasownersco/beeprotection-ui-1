import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import Modal from 'react-native-modal';
import colors from 'assets/theme/colors';
import Button from "../../../components/Button";

export default class OrderSuccess extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.visible !== this.props.visible;
  // }

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
  };

  render() {
    let {visible, onHide} = this.props;
    return (
      <Modal
        isVisible={visible}
        animationType="slide"
        onBackdropPress={onHide}
        backdropOpacity={0.8}
        transparent={true}
        backdropColor="rgba(0,0,0,0.5)"
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={{
          backgroundColor:'yellow'
        }}
      >
        <View
          style={[
            styles.contentContainer,
            // {
            //   backgroundColor: colors[type],
            // },
          ]}>
          <Text style={[styles.text, styles.centerText]}>
            Order Success
          </Text>

          <Button
            primary
            raised
            onPress={()=>{}}
          >
            Go To Home
          </Button>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent:'center',
    margin:0,
    padding:0,
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
});
