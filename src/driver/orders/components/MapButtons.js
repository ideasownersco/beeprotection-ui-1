import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'components/Button';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'utils/locale';
import AddressInfo from 'components/AddressInfo';
import Dialog from 'components/Dialog';

export default class MapButtons extends Component {
  static propTypes = {
    jobStatus: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    startDriving: PropTypes.func.isRequired,
    stopDriving: PropTypes.func.isRequired,
    startWorking: PropTypes.func.isRequired,
    stopWorking: PropTypes.func.isRequired,
    onDirectionPress: PropTypes.func.isRequired,
    approveImages: PropTypes.func.isRequired,
    uploadImages: PropTypes.func.isRequired,
    imagesApproved: PropTypes.bool.isRequired,
    imagesUploaded: PropTypes.bool.isRequired,
  };

  state = {
    showStartWorkingDialog: false,
    showStartDrivingDialog: false,
    showStopWorkingDialog: false,
    showStopDrivingDialog: false,
  };

  showStartDrivingDialog = () => {
    this.setState({
      showStartDrivingDialog: true,
    });
  };

  hideStartDrivingDialog = () => {
    this.setState({
      showStartDrivingDialog: false,
    });
  };

  showStopDrivingDialog = () => {
    this.setState({
      showStopDrivingDialog: true,
    });
  };

  hideStopDrivingDialog = () => {
    this.setState({
      showStopDrivingDialog: false,
    });
  };

  showStartWorkingDialog = () => {
    this.setState({
      showStartWorkingDialog: true,
    });
  };

  hideStartWorkingDialog = () => {
    this.setState({
      showStartWorkingDialog: false,
    });
  };

  showStopWorkingDialog = () => {
    this.setState({
      showStopWorkingDialog: true,
    });
  };

  hideStopWorkingDialog = () => {
    this.setState({
      showStopWorkingDialog: false,
    });
  };

  startDriving = () => {
    this.props.startDriving();
    this.hideStartDrivingDialog();
  };

  stopDriving = () => {
    this.props.stopDriving();
    this.hideStopDrivingDialog();
  };

  startWorking = () => {
    this.props.startWorking();
    this.hideStartWorkingDialog();
  };

  stopWorking = () => {
    this.props.stopWorking();
    this.hideStopWorkingDialog();
  };

  render() {
    let {
      showStartWorkingDialog,
      showStartDrivingDialog,
      showStopDrivingDialog,
      showStopWorkingDialog,
    } = this.state;

    const {
      jobStatus,
      address,
      onDirectionPress,
      approveImages,
      uploadImages,
      imagesApproved,
      imagesUploaded,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.navContainer}>
          <Text style={styles.address}>
            <AddressInfo address={address} style={{textAlign: 'center'}} />
          </Text>

          <Touchable onPress={onDirectionPress}>
            <View style={{alignItems: 'center'}}>
              <Ionicons name="ios-navigate-outline" size={35} />
            </View>
          </Touchable>
        </View>

        {jobStatus == 'pending' && (
          <Button
            title={I18n.t('start_driving')}
            onPress={this.showStartDrivingDialog}
            style={{marginBottom: 10}}
          />
        )}

        {jobStatus == 'driving' && (
          <Button
            title={I18n.t('stop_driving')}
            onPress={this.showStopDrivingDialog}
            style={{marginBottom: 10}}
          />
        )}

        {jobStatus == 'reached' && (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              title={I18n.t('start_working')}
              onPress={this.showStartWorkingDialog}
              style={{marginBottom: 10, width: 150}}
            />

            {imagesUploaded &&
              !imagesApproved && (
                <Button
                  title={I18n.t('approve_images')}
                  onPress={approveImages}
                  style={{marginBottom: 10, width: 150}}
                />
              )}

            {!imagesUploaded && (
              <Button
                title={I18n.t('upload_images')}
                onPress={uploadImages}
                style={{marginBottom: 10, width: 150}}
              />
            )}
          </View>
        )}

        {jobStatus == 'working' && (
          <Button
            title={I18n.t('stop_working')}
            onPress={this.showStopWorkingDialog}
            style={{marginBottom: 10}}
          />
        )}

        <Dialog
          description="You are about to start driving to the destination"
          close={this.hideStartDrivingDialog}
          confirm={this.startDriving}
          visible={showStartDrivingDialog}
        />
        <Dialog
          description="Have you reached the destination ?"
          close={this.hideStopDrivingDialog}
          confirm={this.stopDriving}
          visible={showStopDrivingDialog}
        />
        <Dialog
          description="Do you want to start working on the Job ?"
          close={this.hideStartWorkingDialog}
          confirm={this.startWorking}
          visible={showStartWorkingDialog}
        />
        <Dialog
          description="Have you completed the Job ?"
          close={this.hideStopWorkingDialog}
          confirm={this.stopWorking}
          visible={showStopWorkingDialog}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  mapMarker: {},
  image: {
    width: 20,
    height: 40,
  },
  navContainer: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  address: {
    flex: 1,
    paddingHorizontal: 15,
    textAlign: 'center',
  },
});
