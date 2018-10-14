import PropTypes from 'prop-types';
import React, {Component} from 'react';
import isEmpty from 'lodash/isEmpty';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import {Snackbar} from 'react-native-paper';

export default class Notification extends Component {
  static propTypes = PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
  }).isRequired;

  state = {
    visible: false,
  };

  static getDerivedStateFromProps(nextProps) {
    if (!isEmpty(nextProps.message)) {
      return {
        visible: true,
      };
    }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.props.dismissNotification();
  };

  render() {
    const {type, message} = this.props;

    const {visible} = this.state;

    return (
      <Snackbar
        visible={visible}
        onDismiss={() => this.closeModal()}
        duration={3500}
        primary
        raised
        style={{
          backgroundColor: type === 'error' ? colors.error : colors.success,
        }}
        action={{
          label: I18n.t('ok'),
          onPress: () => {
            this.closeModal();
          },
        }}>
        {message}
      </Snackbar>
    );
  }
}
