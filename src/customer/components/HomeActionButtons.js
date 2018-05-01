import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';
import Entypo from 'react-native-vector-icons/Entypo';

export default class HomeActionButtons extends Component {
  static propTypes = {
    onCreateOrderPress: PropTypes.func.isRequired,
    // onProtectionPress: PropTypes.func.isRequired,
  };

  render() {
    const {onCreateOrderPress, onProtectionPress} = this.props;

    return (
      <View style={styles.container}>
        <Touchable onPress={() => onCreateOrderPress()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              {I18n.t('start').toUpperCase()}
            </Text>
          </View>
        </Touchable>
      </View>
    );
    // return (
    //   <View style={styles.container}>
    //     <Touchable
    //       style={styles.buttonContainer}
    //       onPress={() => onCreateOrderPress()}>
    //       <View style={styles.content}>
    //         <MaterialCommunityIcons
    //           name="car-wash"
    //           size={40}
    //           color={colors.white}
    //         />
    //         <Text style={[styles.buttonText]}>{I18n.t('car_wash')}</Text>
    //       </View>
    //     </Touchable>
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
  content: {},
  buttonContainer: {
    borderRadius: 3,
    width: 300,
    padding: 10,
    borderWidth: 6,
    borderColor: '#62A3D0',
    backgroundColor: '#1c599d',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '900',
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonContainer: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//     borderRadius: 40,
//     height: 150,
//     width: 150,
//     marginHorizontal: 10,
//     borderColor: 'white',
//     borderWidth: 2,
//   },
//   content: {
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: colors.primary,
//     borderRadius: 30,
//     padding: 10,
//     height: 40,
//     width: 200,
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: colors.white,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '500',
//   },
//   Divider: {
//     height: 50,
//     width: 0.5,
//     backgroundColor: colors.mediumGrey,
//   },
// });
