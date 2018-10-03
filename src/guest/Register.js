/**
 @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from 'guest/common/actions';
import {Text} from 'react-native';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import I18n from 'utils/locale';
import Touchable from 'react-native-platform-touchable';
import FormContainer from 'components/FormContainer';
import FormContent from 'components/FormContent';
import {ActivityIndicator, Platform, View} from 'react-native';
import {
  Paragraph,
  Colors,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from 'react-native-paper';

const isIOS = Platform.OS === 'ios';
type State = {
  name: string,
  email: string,
  password: string,
  mobile: string,
};

class Register extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  state: State = {
    // name: 'afzal',
    // email: 'zzz@a.com',
    // mobile: '97978803',
    // password: 'password',
    // password_confirmation: 'password',
    // confirmation_code:null,
    name: null,
    email: null,
    mobile: null,
    password: null,
    password_confirmation: null,
    confirmation_code: null,
    show_resend_confirmation_screen: false,
  };

  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  handleRegister = () => {
    let credentials = this.state;
    this.props.actions.register({
      ...credentials,
      driver:
        (this.props.navigation.state.params &&
          this.props.navigation.state.params.userType &&
          this.props.navigation.state.params.userType === 'driver') ||
        false,
    });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  onLoginPress = () => {
    this.props.navigation.pop();
  };

  confirmRegistration = () => {
    this.props.actions.confirmRegistration({
      code: this.state.confirmation_code,
    });
  };

  reSendConfirmationCode = () => {
    this.setState({
      show_resend_confirmation_screen: false,
    });
    this.props.actions.reSendConfirmationCode({
      email: this.state.email,
    });
  };

  render() {
    const {
      name,
      email,
      mobile,
      password,
      password_confirmation,
      busy,
    } = this.state;

    let {auth} = this.props;

    return (
      <FormContainer style={{paddingTop: 40}}>
        <FormContent>
          <FormTextInput
            onValueChange={this.onFieldChange}
            value={name}
            field="name"
            maxLength={40}
            label={I18n.t('name')}
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={email}
            field="email"
            maxLength={40}
            label={I18n.t('email')}
            keyboardType="email-address"
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={mobile}
            field="mobile"
            maxLength={40}
            label={I18n.t('mobile')}
            keyboardType="phone-pad"
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={password}
            field="password"
            maxLength={40}
            label={I18n.t('password')}
            secureTextEntry={true}
          />

          <FormTextInput
            onValueChange={this.onFieldChange}
            value={password_confirmation}
            field="password_confirmation"
            maxLength={40}
            secureTextEntry={true}
            label={I18n.t('password')}
          />

          <FormSubmit
            onPress={this.handleRegister}
            disabled={busy}
            title={busy ? I18n.t('signing_up') : I18n.t('create_account')}
            style={{marginVertical: 20}}
          />

          <Button
            primary
            onPress={() =>
              this.setState({show_resend_confirmation_screen: true})
            }
            loading={auth.confirming}
            disabled={auth.confirming}>
            {I18n.t('resend_confirmation_code')}
          </Button>

          <Dialog visible={this.state.show_resend_confirmation_screen}>
            <DialogContent>
              {/*<Paragraph>{I18n.t('r')}</Paragraph>*/}
              <FormTextInput
                field="email"
                onValueChange={this.onFieldChange}
                label={I18n.t('email')}
              />

              <Button
                raised
                primary
                onPress={this.reSendConfirmationCode}
                loading={auth.confirming}
                disabled={auth.confirming}>
                {I18n.t('confirm')}
              </Button>
            </DialogContent>
          </Dialog>
        </FormContent>

        <Touchable onPress={this.onLoginPress}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              paddingVertical: 10,
            }}>
            {I18n.t('have_an_account')} {I18n.t('login_do')}
          </Text>
        </Touchable>

        <Dialog visible={auth.confirmationScreenVisible}>
          {/*<DialogTitle>Progress Dialog</DialogTitle>*/}
          <DialogContent>
            <Paragraph>{I18n.t('confirm_account')}</Paragraph>
            <FormTextInput
              field="confirmation_code"
              onValueChange={this.onFieldChange}
              label={I18n.t('confirmation_code')}
            />

            <Button
              raised
              primary
              onPress={this.confirmRegistration}
              loading={auth.confirming}
              disabled={auth.confirming}>
              {I18n.t('confirm')}
            </Button>
          </DialogContent>
        </Dialog>
      </FormContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(ACTIONS, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
