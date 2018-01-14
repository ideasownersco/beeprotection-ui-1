import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text} from 'react-native';
import I18n from 'utils/locale';

export default class TranslatedText extends Component {
  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps);
  };

  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    const {text} = this.props;

    return (
      <Text
        ref={component => (this._root = component)}
        {...this.props}
        style={[styles.text, this.props.style]}>
        {I18n.t(text)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
  },
});
