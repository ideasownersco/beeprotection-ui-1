import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Title} from 'react-native-paper';
import Swiper from 'react-native-swiper';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Button from 'components/Button';
import Divider from 'components/Divider';

export default class SplashScreen extends Component {
  static propTypes = {
    onEndReached: PropTypes.func.isRequired,
    onLanguageSelect: PropTypes.func.isRequired,
  };

  render() {
    let {onEndReached, onLanguageSelect} = this.props;
    return (
      <View style={styles.container}>
        <Title style={styles.title}>{I18n.t('app_name')}</Title>

        <Swiper
          style={styles.slider}
          autoPlay={false}
          showsButtons={false}
          removeClippedSubviews={false}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          loop={false}>
          <View style={styles.slide}>
            <Image
              source={require('./../assets/images/splash/1.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Divider />
            <Text style={styles.description}>{I18n.t('slider_1')}</Text>
          </View>

          <View style={styles.slide}>
            <Image
              source={require('./../assets/images/splash/2.png')}
              style={styles.image}
              resizeMode="stretch"
            />
            <Text style={styles.description}>{I18n.t('slider_2')}</Text>
          </View>

          <View style={styles.slide}>
            <Image
              source={require('./../assets/images/splash/3.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.description}>{I18n.t('slider_3')}</Text>
          </View>

          <View style={styles.slide}>
            <Image
              source={require('./../assets/images/splash/4.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Button
              onPress={onEndReached}
              style={styles.button}
              title={I18n.t('slider_4')}
              raised
              primary
              dark
            />
          </View>
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.primary,
  },
  title: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 22,
  },
  description: {
    color: colors.black,
    fontWeight: '700',
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
    marginVertical: 30,
    width: '90%',
    height: '75%',
  },
});
