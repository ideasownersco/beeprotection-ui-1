import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'guest/common/actions';
import LoginScene from 'guest/scenes/LoginScene';
import {NavigationActions} from 'react-navigation';
import {Alert, Text, TouchableHighlight} from 'react-native';
import I18n from 'utils/locale';
import FormContainer from 'components/FormContainer';
import FormContent from 'components/FormContent';
import FormTextInput from 'components/FormTextInput';
import FormSubmit from 'components/FormSubmit';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';

class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  // static navigationOptions = () => {
  //   return {
  //     header: null,
  //   };
  // };

  state = {
    email: 'customer@test.com',
    password: 'secret',
  };

  handleLogin = () => {
    let {redirectRoute} = this.props.navigation.state.params || {};

    return new Promise((resolve, reject) => {
      const credentials = {
        email: this.state.email,
        password: this.state.password,
      };

      // if(scene && scene === 'checkout') {
      //   this.props.navigation.navigate('Cart');
      // }
      this.props.actions.login({credentials, resolve, reject, redirectRoute});
    })
      .then(user => {
        // if(scene && scene === 'checkout') {
        //   this.props.navigation.navigate('Cart');
        // }
      })
      .catch(e => {
        console.log('e');
      });
  };

  handleRegisterRoute = () => {
    return this.props.navigation.navigate('RegisterScreen');
    // return Alert.alert(I18n.t('choose_account_type'), '', [
    //   {
    //     text: I18n.t('yes'),
    //     onPress: () => {
    //       this.props.navigation.navigate('RegisterScreen', {
    //         isCompany: true,
    //       });
    //     },
    //   },
    //   {
    //     text: I18n.t('no'),
    //     onPress: () => {
    //       this.props.navigation.navigate('RegisterScreen', {
    //         isCompany: false,
    //       });
    //     },
    //   },
    //   // {
    //   //   text: I18n.t('driver'),
    //   //   onPress: () => {
    //   //     this.props.navigation.navigate('RegisterScreen', {
    //   //       userType: 'driver',
    //   //     });
    //   //   },
    //   // },
    // ]);
  };

  handleForgotPasswordRoute = () => {
    this.props.navigation.navigate('ForgotScreen');
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  goBack = () => {
    const navigationAction = NavigationActions.back();
    this.props.navigation.dispatch(navigationAction);
  };

  onSkip = () => {
    this.props.navigation.goBack(null);
  };

  render() {
    const {auth} = this.props;
    const {
      email,
      password,
      onFieldChange,
      handleLogin,
      handleRegisterRoute,
      handleForgotPasswordRoute,
      onSkip,
      busy,
    } = this.state;

    console.log('props', this.props);

    return (
      <FormContainer>
        <FormContent>
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
            value={password}
            field="password"
            maxLength={40}
            label={I18n.t('password')}
            secureTextEntry={true}
          />

          <FormSubmit
            onPress={this.handleLogin}
            disabled={auth.login.busy}
            title={auth.login.busy ? I18n.t('logging_in') : I18n.t('login')}
            style={{marginTop: 20}}
          />

          <Divider style={{marginVertical: 30}} />

          <FormSubmit
            onPress={this.handleRegisterRoute}
            style={{backgroundColor: colors.secondary}}
            disabled={busy}
            title={I18n.t('create_account')}
          />

          <TouchableHighlight
            onPress={this.handleForgotPasswordRoute}
            style={{paddingTop: 100}}
            underlayColor="transparent"
            disabled={busy}>
            <Text style={{textAlign: 'center'}}>
              {I18n.t('forgot_password')}
            </Text>
          </TouchableHighlight>
        </FormContent>
      </FormContainer>
    );

    // return (
    //   <LoginScene
    //     {...this.state}
    //     handleLogin={this.handleLogin}
    //     handleRegisterRoute={this.handleRegisterRoute}
    //     handleForgotPasswordRoute={this.handleForgotPasswordRoute}
    //     onSkip={this.onSkip}
    //     onFieldChange={this.onFieldChange}
    //     busy={auth.login.busy}
    //     onRightButtonPress={this.goBack}
    //   />
    // );
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
