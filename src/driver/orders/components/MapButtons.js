import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Button from 'components/Button';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'utils/locale';
import AddressInfo from 'components/AddressInfo';

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

  render() {
    const {
      jobStatus,
      address,
      startDriving,
      stopDriving,
      startWorking,
      stopWorking,
      onDirectionPress,
      approveImages,
      uploadImages,
      imagesApproved,
      imagesUploaded,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.navContainer}>
          {/*<Touchable onPress={this.reCenterMap}>*/}
          {/*<View style={{alignItems: 'center'}}>*/}
          {/*<MaterialCommunityIcons name="arrow-all" size={35} />*/}
          {/*</View>*/}
          {/*</Touchable>*/}
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
            onPress={startDriving}
            style={{marginBottom: 10}}
          />
        )}

        {jobStatus == 'driving' && (
          <Button
            title={I18n.t('stop_driving')}
            onPress={stopDriving}
            style={{marginBottom: 10}}
          />
        )}

        {jobStatus == 'reached' && (
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              title={I18n.t('start_working')}
              onPress={startWorking}
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
            onPress={stopWorking}
            style={{marginBottom: 10}}
          />
        )}
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
