import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Image, Linking, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import I18n from 'utils/locale';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class CustomerInfo extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.user !== this.props.user;
  }

  makeCall = () => {
    let {user} = this.props;
    let url = `tel:${user.mobile}`;
    return Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      }
    });
  };

  render() {
    let {user} = this.props;

    return (
      <View style={[styles.itemContainer]}>
        <View style={styles.imageContainer}>
          {user.image ? (
            <Image source={{uri: user.image}} style={styles.image} />
          ) : (
            <Feather name="user" size={30} style={styles.image} />
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <View style={{flex: 1}}>
            <Text style={[styles.title]}>{user.name}</Text>

            <Text style={[styles.title]}>
              {I18n.t('mobile')}:{user.mobile}
            </Text>
          </View>

          <Touchable onPress={this.makeCall}>
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
    flexDirection: 'row',
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
