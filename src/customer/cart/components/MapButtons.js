import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import I18n from 'utils/locale';
import {Button} from 'react-native-paper';

export default class MapButtons extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps, prevState) {
    return false;
  }

  render() {
    let {close, save} = this.props;

    return (
      <View style={styles.container}>
        <Button onPress={close} style={styles.button} raised>
          {I18n.t('cancel')}
        </Button>

        <Button onPress={save} style={styles.button} raised primary dark>
          {I18n.t('save')}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    margin: 5,
    flexDirection: 'row',
    zIndex: 5000,
  },
  button: {
    flex: 1,
    borderRadius: 0,
  },
});
