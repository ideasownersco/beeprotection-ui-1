import React from 'react';
import {AppRegistry, Platform, View} from 'react-native';
import Store from './src/utils/store';
import App from './src/app/App';
import {Provider} from 'react-redux';
import colors from "./src/assets/theme/colors";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
// import moment from 'moment-timezone';


const isIOS = Platform.OS === 'ios';

console.disableYellowBox = true;

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: colors.secondary,
  },
  fonts:{
    regular: isIOS ? 'AvenirNext-Regular' : 'sans-serif',
    medium: isIOS ? 'AvenirNext-Medium' : 'sans-serif-medium',
    light: isIOS ? 'Avenir-Light' : 'sans-serif-light',
    thin: isIOS ? 'AvenirNext-UltraLight' : 'sans-serif-thin',
  }
};

const Root = () => {
  return (
    <View style={{flex: 1}}>
      <Provider store={Store}>
        <PaperProvider theme={theme}>
          <App/>
        </PaperProvider>
      </Provider>
    </View>
  );
};

AppRegistry.registerComponent('BeeProtection', () => Root);
