import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'guest/common/actions';
import LoginScene from 'guest/scenes/LoginScene';
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import I18n from 'utils/locale';

class Login extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  // static navigationOptions = {
  //   header: null,
  // };

  state = {
    email: 'customer@test.com',
    password: 'secret',
  };

  handleLogin = () => {
    const credentials = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.actions.login(credentials, this.props.navigation);
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
    return (
      <LoginScene
        {...this.state}
        handleLogin={this.handleLogin}
        handleRegisterRoute={this.handleRegisterRoute}
        handleForgotPasswordRoute={this.handleForgotPasswordRoute}
        onSkip={this.onSkip}
        onFieldChange={this.onFieldChange}
        busy={auth.login.busy}
        onRightButtonPress={this.goBack}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
