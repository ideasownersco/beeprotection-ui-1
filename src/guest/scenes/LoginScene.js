import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import colors from 'theme/colors';
import I18n, {isRTL} from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import Divider from 'components/Divider';

export default class LoginScene extends Component {
  static propTypes = {
    handleForgotPasswordRoute: PropTypes.func.isRequired,
    handleRegisterRoute: PropTypes.func.isRequired,
    handleLogin: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
  };

  render() {
    const {
      email,
      password,
      onFieldChange,
      handleLogin,
      handleRegisterRoute,
      handleForgotPasswordRoute,
      busy,
      onSkip,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('email')} />
        <FormTextInput
          onValueChange={value => onFieldChange('email', value)}
          value={email}
          maxLength={40}
          keyboardType="email-address"
          autoFocus={true}
        />

        <FormLabel title={I18n.t('password')} />
        <FormTextInput
          onValueChange={value => onFieldChange('password', value)}
          value={password}
          maxLength={40}
          secureTextEntry={true}
        />

        <FormSubmit
          onPress={() => handleLogin()}
          disabled={busy}
          title={busy ? I18n.t('logging_in') : I18n.t('login')}
          style={{marginTop: 50}}
        />

        <Divider style={{marginVertical: 30}} />

        <FormSubmit
          onPress={() => handleRegisterRoute()}
          style={styles.buttonSecondary}
          disabled={busy}
          title={I18n.t('create_account')}
        />

        <TouchableHighlight
          onPress={() => handleForgotPasswordRoute()}
          style={{paddingTop: 100}}
          underlayColor="transparent"
          disabled={busy}>
          <Text style={[styles.link]}>{I18n.t('forgot_password')}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 30,
  },
  link: {
    marginTop: 20,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.mediumGrey,
  },
});
