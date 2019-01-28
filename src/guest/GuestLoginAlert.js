import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import I18n from 'utils/locale';
import Dialog from 'components/Dialog';

export default class GuestLoginAlert extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Dialog
          description={I18n.t('login_required')}
          leftButtonPress={this.hideStartDrivingDialog}
          rightButtonPress={this.startDriving}
          visible={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', backgroundColor: 'white'},
});
