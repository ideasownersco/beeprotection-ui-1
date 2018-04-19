/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';

import Modal from 'react-native-modal';
import colors from 'assets/theme/colors';
import {Button, Headline} from 'react-native-paper';
import I18n from 'utils/locale';

export default class ListModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
  };

  static defaultProps = {
    title: '',
  };

  render() {
    let {isVisible, onCancel, title, children, style} = this.props;

    return (
      <View style={styles.container}>
        <Modal
          isVisible={isVisible}
          transparent={false}
          style={[
            styles.container,
            style,
          ]}
          onSwipe={onCancel}
          swipeDirection="down">
          <Headline style={styles.headline}>{title}</Headline>
          {children}
          <Button
            onPress={onCancel}
            raised
            primary
            dark
            style={{marginBottom: 50, paddingVertical: 10}}>
            {I18n.t('save')}
          </Button>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    backgroundColor: 'white',
    opacity: 0.95,
    paddingTop: 40,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
