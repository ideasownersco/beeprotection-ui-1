import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import NavBar from 'components/NavBar';
import NavButton from 'components/NavButton';
import I18n, {isRTL} from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import colors from 'theme/colors';

export default class RegisterScene extends Component {
  static propTypes = {
    handleRegister: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
  };

  render() {
    const {
      name,
      email,
      mobile,
      password,
      password_confirmation,
      onFieldChange,
      handleRegister,
      busy,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('name')} />
        <FormTextInput
          onChangeText={value => onFieldChange('name', value)}
          value={name}
          maxLength={40}
          placeholder={I18n.t('name')}
        />

        <FormLabel title={I18n.t('email')} />
        <FormTextInput
          onChangeText={value => onFieldChange('email', value)}
          value={email}
          maxLength={40}
          placeholder={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormLabel title={I18n.t('mobile')} />

        <FormTextInput
          onChangeText={value => onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          placeholder={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormLabel title={I18n.t('password')} />
        <FormTextInput
          onChangeText={value => onFieldChange('password', value)}
          value={password}
          maxLength={40}
          placeholder={I18n.t('password')}
          secureTextEntry={true}
        />

        <FormLabel title={I18n.t('confirm_password')} />
        <FormTextInput
          onChangeText={value => onFieldChange('password_confirmation', value)}
          value={password_confirmation}
          maxLength={40}
          secureTextEntry={true}
          placeholder={I18n.t('password')}
        />

        <FormSubmit
          onPress={() => handleRegister()}
          disabled={busy}
          title={busy ? I18n.t('signing_up') : I18n.t('create_account')}
          style={{marginTop: 50}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 20,
  },
  buttonSecondary: {
    backgroundColor: colors.mediumGrey,
  },
});
