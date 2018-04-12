/**
 @flow
 */
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ACTIONS} from './common/actions';
import RegisterScene from './scenes/RegisterScene';
import {View} from "react-native";
import FormLabel from "../components/FormLabel";
import FormTextInput from "../components/FormTextInput";
import FormSubmit from "../components/FormSubmit";
import I18n from 'utils/locale';
type State = {
  name: string,
  email: string,
  password: string,
  mobile: string,
};

class Register extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state: State = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    password_confirmation: '',
  };

  static navigationOptions = () => {
    return {
      header:null
    }
  };

  handleRegister = () => {
    let credentials = this.state;
    this.props.actions.register(credentials);
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    const {auth} = this.props;

    const {
      name,
      email,
      mobile,
      password,
      password_confirmation,
      busy,
    } = this.state;
    
    return (
      <View style={{backgroundColor:'#5096ac',flex:1,padding:10}}>
        <FormTextInput
          onValueChange={value => this.onFieldChange('name', value)}
          value={name}
          maxLength={40}
          label={I18n.t('name')}
        />

        <FormTextInput
          onValueChange={value => this.onFieldChange('email', value)}
          value={email}
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormTextInput
          onValueChange={value => this.onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          label={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <FormTextInput
          onValueChange={value => this.onFieldChange('password', value)}
          value={password}
          maxLength={40}
          label={I18n.t('password')}
          secureTextEntry={true}
        />

        <FormTextInput
          onValueChange={value => this.onFieldChange('password_confirmation', value)}
          value={password_confirmation}
          maxLength={40}
          secureTextEntry={true}
          label={I18n.t('password')}
        />

        <FormSubmit
          onPress={() => this.handleRegister()}
          disabled={busy}
          title={busy ? I18n.t('signing_up') : I18n.t('create_account')}
          style={{marginTop: 50}}
        />
      </View>
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
