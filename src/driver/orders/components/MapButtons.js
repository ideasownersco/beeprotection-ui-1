import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View,} from 'react-native';
import Button from 'components/Button';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';
import AddressInfo from 'components/AddressInfo';

export default class MapButtons extends Component {

  static propTypes = {
    jobStatus: PropTypes.string,
  };

  static defaultProps = {
    jobStatus: 'pending',
  };

  startDriving = () => {
    this.map.fitToElements(true);
    if (!this.state.enabled) {
      this.setState({
        enabled: true,
      });
    }
    this.props.startDriving();
    BackgroundGeolocation.start();
  };

  stopDriving = () => {
    this.map.fitToElements(true);
    if (this.state.enabled) {
      this.setState({
        enabled: false,
      });
    }
    this.props.stopDriving();
    BackgroundGeolocation.stop();
  };

  startWorking = () => {
    this.props.startWorking();
  };

  stopWorking = () => {
    this.props.stopWorking();
  };


  render() {
    const {jobStatus} = this.props;
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'white'}}>
          <View style={styles.navContainer}>
            <Touchable onPress={this.reCenterMap}>
              <View style={{alignItems: 'center'}}>
                <MaterialCommunityIcons name="arrow-all" size={35}/>
              </View>
            </Touchable>
            <Text style={styles.address}>
              <AddressInfo address={address} style={{textAlign: 'center'}}/>
            </Text>

            <Touchable onPress={this.openInGoogleMaps}>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="ios-navigate-outline" size={35}/>
              </View>
            </Touchable>
          </View>

          {jobStatus == 'pending' && (
            <Button
              title={I18n.t('start_driving')}
              onPress={this.startDriving}
              style={{marginBottom: 10}}
            />
          )}

          {jobStatus == 'driving' && (
            <Button
              title={I18n.t('stop_driving')}
              onPress={this.stopDriving}
              style={{marginBottom: 10}}
            />
          )}

          {jobStatus == 'reached' && (
            <Button
              title={I18n.t('start_working')}
              onPress={this.startWorking}
              style={{marginBottom: 10}}
            />
          )}

          {jobStatus == 'working' && (
            <Button
              title={I18n.t('stop_working')}
              onPress={this.stopWorking}
              style={{marginBottom: 10}}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
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
