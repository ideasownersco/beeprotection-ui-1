import React from 'react';
import {AppRegistry, Platform, StatusBar, StyleSheet, SafeAreaView, View} from 'react-native';
import Store from './src/utils/store';
import App from './src/app/App';
import {Provider} from 'react-redux';
import colors from "./src/assets/theme/colors";

console.disableYellowBox = true;

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const Root = () => {
  return (
    <View style={{flex: 1}}>
      {/*<MyStatusBar backgroundColor={colors.primary} barStyle="light-content"/>*/}
      <Provider store={Store}>
        <App/>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

AppRegistry.registerComponent('BeeProtection', () => Root);
