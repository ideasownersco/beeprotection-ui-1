import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';

export default class ForgotScene extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    busy: PropTypes.bool.isRequired,
    onRightButtonPress: PropTypes.func.isRequired,
    onForgotPassword: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
  };

  render() {
    const {email, onFieldChange, onForgotPassword} = this.props;

    return (
      <View style={styles.container}>
        {/*<FormLabel title={I18n.t('email')} />*/}

        <FormTextInput
          onValueChange={onFieldChange}
          value={email}
          field="email"
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormSubmit
          onPress={() => onForgotPassword()}
          title={I18n.t('recover_password')}
          style={{marginVertical: 50}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'white',
    // padding: 10,
    // paddingTop: 20,
  },
});
