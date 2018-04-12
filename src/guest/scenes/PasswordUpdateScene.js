import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import NavBar from 'components/NavBar';
import NavButton from 'components/NavButton';
import FormLabel from 'components/FormLabel';
import I18n from 'utils/locale';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import {isRTL} from 'utils/locale';

export default class PasswordUpdateScene extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    onUpdatePassword: PropTypes.func.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    confirmedPassword: PropTypes.string.isRequired,
  };

  render() {
    const {
      onFieldChange,
      password,
      confirmedPassword,
      onUpdatePassword,
      onRightButtonPress,
    } = this.props;

    return (
      <View style={styles.container}>

        <FormTextInput
          onValueChange={this.onFieldChange}
          label={I18n.t('new_password')}
          value={password}
          field="password"
          maxLength={40}
          secureTextEntry={true}
        />

        <FormLabel title={I18n.t('confirm_new_password')} />
        <FormTextInput
          onValueChange={this.onFieldChange}
          value={confirmedPassword}
          maxLength={40}
          label={I18n.t('confirm_new_password')}
          field="confirm_new_password"
          secureTextEntry={true}
        />

        <FormSubmit
          onPress={() => onUpdatePassword()}
          underlayColor="transparent"
          disabled={!password || !confirmedPassword}
          title={I18n.t('confirm')}
          style={{marginTop: 50}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'white',
    padding: 20,
  },
});
