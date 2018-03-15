import {AppRegistry} from 'react-native';
import React from 'react';
import Store from 'utils/store';
import App from 'app/App';
import {Provider} from 'react-redux';
import {Provider as PaperProvider,DefaultTheme} from 'react-native-paper';
import colors from "./src/assets/theme/colors";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    accent: 'yellow',
  },
};

const Root = () => {
  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <App/>
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent('BeeProtection', () => Root);
