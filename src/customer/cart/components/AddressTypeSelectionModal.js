/* @flow */

import React, {Component} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Subheading,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogScrollArea,
  RadioButton,
  TouchableRipple,
} from 'react-native-paper';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import colors from 'assets/theme/colors';

export default class AddressTypeSelectionModal extends Component {
  state = {
    type: this.props.active,
  };

  static defaultProps = {
    active: 'current_location',
    visible: false,
  };

  render() {
    let {type} = this.state;
    const {visible, close, onPress} = this.props;
    return (
      <Dialog onDismiss={close} visible={visible}>
        <DialogTitle>{I18n.t('select_location_type')}</DialogTitle>
        <DialogScrollArea style={{maxHeight: 170, paddingHorizontal: 0}}>
          <ScrollView>
            <View>
              <TouchableRipple
                onPress={() => this.setState({type: 'current_location'})}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="normal"
                      checked={type === 'current_location'}
                    />
                  </View>
                  <IconFactory
                    type="MaterialIcons"
                    name="my-location"
                    color={colors.error}
                  />
                  <Subheading style={styles.text}>
                    {I18n.t('current_location')}
                  </Subheading>
                </View>
              </TouchableRipple>
              <TouchableRipple
                onPress={() => this.setState({type: 'elsewhere'})}>
                <View style={styles.row}>
                  <View pointerEvents="none">
                    <RadioButton
                      value="normal"
                      checked={type === 'elsewhere'}
                    />
                  </View>
                  <IconFactory
                    type="MaterialIcons"
                    name="location-on"
                    color={colors.error}
                  />

                  <Subheading style={styles.text}>
                    {I18n.t('elsewhere')}
                  </Subheading>
                </View>
              </TouchableRipple>
            </View>
          </ScrollView>
        </DialogScrollArea>
        <DialogActions>
          <Button primary onPress={close}>
            {I18n.t('cancel')}
          </Button>
          <Button primary onPress={() => onPress(type)}>
            {I18n.t('next')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
});
