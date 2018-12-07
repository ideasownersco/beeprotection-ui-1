import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import Button from 'components/Button';

export default class MapButtons extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, prevState) {
    return nextProps.savingAddress !== this.props.savingAddress;
  }

  render() {
    let {close, save, style, savingAddress} = this.props;

    return (
      <View style={[styles.container, style]}>
        <Button
          onPress={close}
          style={styles.button}
          raised
          title={I18n.t('cancel')}
          disabled={savingAddress}
        />
        <Button
          onPress={save}
          style={styles.button}
          raised
          primary
          dark
          title={savingAddress ? I18n.t('saving') : I18n.t('save')}
          disabled={savingAddress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    borderRadius: 0,
  },
});
