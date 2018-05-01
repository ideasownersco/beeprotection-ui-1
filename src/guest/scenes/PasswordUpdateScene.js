import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';

export default class PasswordUpdateScene extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    password_confirmation: PropTypes.string.isRequired,
  };

  render() {
    const {
      onFieldChange,
      password,
      password_confirmation,
      onUpdatePassword,
    } = this.props;

    return (
      <View style={styles.container}>
        <FormTextInput
          onValueChange={onFieldChange}
          label={I18n.t('new_password')}
          value={password}
          field="password"
          maxLength={40}
          secureTextEntry={true}
        />

        <FormTextInput
          onValueChange={onFieldChange}
          value={password_confirmation}
          maxLength={40}
          label={I18n.t('confirm_new_password')}
          field="password_confirmation"
          secureTextEntry={true}
        />

        <FormSubmit
          onPress={() => onUpdatePassword()}
          underlayColor="transparent"
          disabled={!password || !password_confirmation}
          title={I18n.t('confirm')}
          style={{marginTop: 50}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
