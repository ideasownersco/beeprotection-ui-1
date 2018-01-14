/**
 * @flow
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {ScrollView} from 'react-native';
import RegisterScene from 'guest/scenes/RegisterScene';
import {ACTIONS as AUTH_ACTIONS} from 'guest/common/actions';

class AddDriverScene extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  state: State = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    password_confirmation: '',
  };

  handleRegister = () => {
    let credentials = this.state;
    this.props.dispatch(
      AUTH_ACTIONS.register({
        ...credentials,
        driver: true,
      }),
    );
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    const {auth} = this.props;
    return (
      <ScrollView style={{flex: 1}} keyboardShouldPersistTap="always">
        <RegisterScene
          {...this.state}
          handleRegister={this.handleRegister}
          onFieldChange={this.onFieldChange}
          busy={auth.register.busy}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.user,
  };
}

export default connect(mapStateToProps)(AddDriverScene);
