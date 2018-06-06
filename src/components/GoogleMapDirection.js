/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {address, View, Linking} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Dialog from 'components/Dialog';
import I18n from 'utils/locale';

export default class GoogleMapDirection extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
  };

  state = {
    dialogVisible: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.address !== this.props.address ||
      nextState.dialogVisible !== this.state.dialogVisible
    );
  }

  static defaultProps = {
    size: 100,
  };

  onConfirm = () => {
    let {latitude, longitude} = this.props.address;

    this.hideModal();

    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  };

  hideModal = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  render() {
    let {dialogVisible} = this.state;
    let {children} = this.props;

    return (
      <View>
        <TouchableRipple
          onPress={() => this.setState({dialogVisible: true})}
          underlayColor="transparent">
          {children}
        </TouchableRipple>

        <Dialog
          title={I18n.t('open_in_google_maps?')}
          rightButtonPress={this.onConfirm}
          leftButtonPress={this.hideModal}
          leftButtonText={I18n.t('cancel')}
          visible={dialogVisible}
        />
      </View>
    );
  }
}
