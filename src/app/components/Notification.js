import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import isEmpty from 'lodash/isEmpty';
import colors from 'assets/theme/colors';
import Button from 'components/Button';
import I18n from 'utils/locale';

export default class Notification extends Component {
  static propTypes = PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    backdropDismiss: PropTypes.bool.isRequired,
  }).isRequired;

  state = {
    visible: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.visible !== this.state.visible;
  }

  componentWillReceiveProps(nextProps, prevState) {
    if (!isEmpty(nextProps.message)) {
      return this.setState({
        visible: true,
      });
    }
  }

  closeModal = () => {
    this.setState({
      visible: false,
    });
    this.props.dismissNotification();
  };

  resolvePosition = position => {
    let modalPosition;
    switch (position) {
      case 'top':
        modalPosition = styles.topModal;
        break;
      case 'bottom':
        modalPosition = styles.bottomModal;
        break;
      default:
        modalPosition = styles.centerModal;
        break;
    }
  };

  render() {
    const {type, message, backdropDismiss, position} = this.props;

    const {visible} = this.state;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={visible}
          style={[styles[position]]}
          onBackdropPress={() => (backdropDismiss ? this.closeModal() : null)}
          ref="root-modal"
          useNativeDriver={true}>
          {position === 'center' ? (
            <View
              style={[
                styles.centerModal,
                // {
                //   backgroundColor: colors[type],
                // },
              ]}>
              <Text style={[styles.text, styles.centerText]}>{message}</Text>
              <Button
                style={styles.centerButton}
                title={I18n.t('continue').toUpperCase()}
                onPress={this.closeModal}
              />
            </View>
          ) : (
            <View
              style={[
                styles.modalContent,
                {
                  backgroundColor: colors[type],
                },
              ]}>
              <Text style={styles.text}>{message}</Text>
            </View>
          )}
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  modalContent: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  top: {
    justifyContent: 'flex-start',
    margin: 0,
  },
  bottom: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  center: {
    padding: 10,
  },
  centerModal: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 50,
    // padding:30,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  centerText: {
    fontSize: 18,
    paddingVertical: 30,
    color: colors.black,
  },
  centerButton: {
    width: 200,
  },
});
