import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from 'assets/theme/colors';

const LanguageSelectScene = ({active, onItemPress}) => {
  return (
    <View style={[styles.container]}>
      <TouchableHighlight
        onPress={() => onItemPress('en')}
        style={styles.selectLanguageWrapper}
        underlayColor="transparent"
        activeOpacity={0.6}>
        <Text
          style={[
            styles.languageTitle,
            active && active === 'en' && styles.active,
          ]}>
          {' '}
          English{' '}
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => onItemPress('ar')}
        style={styles.selectLanguageWrapper}
        underlayColor="transparent"
        activeOpacity={0.6}>
        <Text
          style={[
            styles.languageTitle,
            active && active === 'ar' && styles.active,
          ]}>
          {' '}
          العربي{' '}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

LanguageSelectScene.propTypes = {
  onItemPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  selectLanguageWrapper: {
    flex: 1,
    justifyContent: 'space-around',
  },
  languageTitle: {
    color: 'black',
    fontWeight: '100',
    fontSize: 70,
    textAlign: 'center',
  },
  active: {
    color: colors.primary,
  },
});

export default LanguageSelectScene;
