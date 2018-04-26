import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Button, Title} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import colors from '../assets/theme/colors';
import LanguageSelectScene from "./scenes/LanguageSelectScene";
import I18n from 'utils/locale';

export default class SplashScreen extends Component {
  static propTypes = {
    onEndReached: PropTypes.func.isRequired,
    onLanguageSelect: PropTypes.func.isRequired,
  };

  render() {
    let {onEndReached,onLanguageSelect} = this.props;
    return (
      <View style={styles.container}>
        <Swiper
          style={styles.slider}
          autoPlay={false}
          showsButtons={false}
          removeClippedSubviews={false}
          dot={<View style={styles.dot}/>}
          activeDot={<View style={styles.activeDot}/>}
          loop={false}
        >

          <View style={styles.slide}>
            <Title style={styles.title}>{I18n.t('app_name').toUpperCase()}</Title>
            <Image
              source={require('./../assets/images/splash/1.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.description}>
              Get the car wash at your convenience
            </Text>
          </View>

          <View style={styles.slide}>

            <Title style={styles.title}>BEE WASH</Title>

            <Image
              source={require('./../assets/images/splash/2.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.description}>
              Wash anywhere
            </Text>

          </View>

          <View style={styles.slide}>

            <Title style={styles.title}>BEE WASH</Title>

            <Image
              source={require('./../assets/images/splash/3.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.description}>
              Your Date, Your Time
            </Text>
          </View>


          <View style={styles.slide}>

            <Title style={styles.title}>Live Track the Driver</Title>

            <Image
              source={require('./../assets/images/splash/4.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Button raised  dark onPress={onEndReached} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Start Using the App</Text>
            </Button>
          </View>

        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor:'blue',
  },
  buttonContainer: {
    marginTop:20,
    alignItems: 'center',
  },
  button: {},
  buttonText: {
    color:colors.primary,
  },
  title: {
    color: colors.darkGrey,
    fontWeight: '700',
    fontSize: 22,
    paddingTop: 50,
  },
  description: {
    color: colors.darkGrey,
    fontWeight: '300',
    fontSize: 18,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  image: {
    marginVertical:30,
    width: 400,
    height: 400
  }
});
