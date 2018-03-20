import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text, } from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import Modal from 'react-native-modal';
import colors from "assets/theme/colors";
import {Button} from "react-native-paper";
import I18n from 'utils/locale';
import IconFactory from "../../../components/IconFactory";

export default class CartSuccessModal extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.visible !== this.props.visible;
  // }

  static propTypes = {
    onCheckoutPress: PropTypes.func.isRequired,
    onAddNewItemPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onHide:PropTypes.func.isRequired
  };

  render() {
    let { visible,onHide,onAddNewItemPress,onCheckoutPress } = this.props;
    return (
      <Modal isVisible={visible}
             animationType="slide"
             onBackdropPress={onHide}
             backdropOpacity={.8}
             transparent={true}
             backdropColor="rgba(0,0,0,0.5)"
             style={{
               margin:50,
             }}
             useNativeDriver={true}
             hideModalContentWhileAnimating={true}
      >
        <View
          style={[
            styles.centerModal,
          ]}>

          <IconFactory type="MaterialIcons" name="check-circle" color={colors.primary} size={40}/>

          <Text style={[styles.text, styles.centerText]}>
            {I18n.t('cart_item_added')}
          </Text>


          <Button onPress={onCheckoutPress} raised primary>
            {I18n.t('checkout')}
          </Button>

          <Button onPress={onAddNewItemPress} raised secondary>
            {I18n.t('add_item')}
          </Button>

        </View>

      </Modal>
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
    backgroundColor:'white',
    alignItems: 'center',
    paddingVertical: 50,
    // shadowColor:colors.fadedBlack,
    // shadowOffset:{height:1,width:1},
    // shadowRadius:3,
    // shadowOpacity:.3,
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
