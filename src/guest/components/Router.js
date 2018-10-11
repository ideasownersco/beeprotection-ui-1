import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Login from 'guest/Login';
import Register from 'guest/Register';
import Forgot from 'guest/Forgot';

export const Router = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
    },
    RegisterScreen: {
      screen: Register,
    },
    ForgotScreen: {
      screen: Forgot,
    },
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        borderBottomWidth: 0,
      },
    },
  },
);
