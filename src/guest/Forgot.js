import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import ForgotScene from 'guest/scenes/ForgotScene';
import ConfirmScene from 'guest/scenes/ConfirmScene';
import PasswordUpdateScene from 'guest/scenes/PasswordUpdateScene';
import {ACTIONS} from 'guest/common/actions';
import FormContainer from 'components/FormContainer';
import FormContent from 'components/FormContent';

class Forgot extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
    confirmation_code: '',
    password_confirmation: '',
  };

  onForgotPassword = () => {
    let {email} = this.state;
    this.props.actions.forgotPassword({email: email});
  };

  onRecoverPassword = () => {
    this.props.actions.recoverPassword({
      email: this.state.email,
      confirmation_code: this.state.confirmation_code,
    });
  };

  onUpdatePassword = () => {
    this.props.actions.updatePassword({
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  goBack = () => {
    const navigationAction = NavigationActions.back(null);
    this.props.navigation.dispatch(navigationAction);
  };

  render() {
    const {auth} = this.props;
    const {
      email,
      password_confirmation,
      confirmation_code,
      password,
    } = this.state;

    let renderingComponent;

    if (auth.showPasswordUpdateScene) {
      renderingComponent = (
        <PasswordUpdateScene
          onFieldChange={this.onFieldChange}
          password={password}
          password_confirmation={password_confirmation}
          onUpdatePassword={this.onUpdatePassword}
          onRightButtonPress={this.goBack}
        />
      );
    } else if (auth.showPasswordRecoverScene) {
      renderingComponent = (
        <ConfirmScene
          onRecoverPassword={this.onRecoverPassword}
          onFieldChange={this.onFieldChange}
          confirmation_code={confirmation_code}
          onForgotPassword={this.onForgotPassword}
          onRightButtonPress={this.goBack}
        />
      );
    } else {
      renderingComponent = (
        <ForgotScene
          email={email}
          onForgotPassword={this.onForgotPassword}
          onFieldChange={this.onFieldChange}
          busy={auth.login.busy}
          onRightButtonPress={this.goBack}
        />
      );
    }

    return (
      <FormContainer>
        <FormContent>{renderingComponent}</FormContent>
      </FormContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS, ...APP_ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Forgot);
