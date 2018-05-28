import React from 'react';
import {AppRegistry, Platform, View} from 'react-native';
import Store from './src/utils/store';
import App from './src/app/App';
import {Provider} from 'react-redux';
import colors from "./src/assets/theme/colors";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

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

// const MyStatusBar = ({backgroundColor, ...props}) => (
//   <View style={[styles.statusBar, {backgroundColor}]}>
//     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//   </View>
// );
//
// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
// const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const Root = () => {
  return (
    <View style={{flex: 1}}>
      {/*<MyStatusBar backgroundColor={colors.primary} barStyle="light-content"/>*/}
      <Provider store={Store}>
        <PaperProvider theme={theme}>

        <App/>
        </PaperProvider>
      </Provider>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   statusBar: {
//     // height: STATUSBAR_HEIGHT,
//   },
//   appBar: {
//     backgroundColor: '#79B45D',
//     // height: APPBAR_HEIGHT,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: '#33373B',
//   },
// });

AppRegistry.registerComponent('BeeProtection', () => Root);
