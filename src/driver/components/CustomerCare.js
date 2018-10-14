import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Image, Linking, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import I18n from 'utils/locale';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Divider from '../../components/Divider';

export default class CustomerCare extends Component {
  static propTypes = {
    driver: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.driver !== this.props.driver;
  }

  makeCall = number => {
    let url = `tel:${number}`;

    return Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  render() {
    let {driver} = this.props;
    let {user} = driver;

    return (
      <View style={[styles.itemContainer]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <View style={{flex: 1}}>
            <Text style={[styles.title]}>{I18n.t('mobile')}: 98009966</Text>
          </View>

          <Touchable onPress={() => this.makeCall('98009966')}>
            <MaterialIcons name="phone" size={30} color="green" />
          </Touchable>
        </View>

        <Divider style={{backgroundColor: 'black', marginVertical: 10}} />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <View style={{flex: 1}}>
            <Text style={[styles.title]}>{I18n.t('mobile')}: 98009977</Text>
          </View>

          <Touchable onPress={() => this.makeCall('98009977')}>
            <MaterialIcons name="phone" size={30} color="green" />
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.fadedWhite,
  },
  itemContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
