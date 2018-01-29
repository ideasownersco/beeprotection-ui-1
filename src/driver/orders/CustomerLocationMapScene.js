/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'driver/orders/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import BackgroundGeolocation from 'react-native-background-geolocation';

class CustomerLocationMapScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          order: PropTypes.shape({
            address: PropTypes.object.isRequired,
            accepted_job: PropTypes.object.isRequired,
          }),
        }),
      }),
    }).isRequired,
  };

  onStartJobPress = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.startJob(accepted_job.id));
  };

  onFinishJobPress = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.finishJob(accepted_job.id));
  };

  onUpdateLocation = () => {
    // let {accepted_job} = this.props.navigation.state.params.order;
  };

  render() {
    let {order} = this.props.navigation.state.params;
    let {address} = order;
    let {accepted_job} = this.props.navigation.state.params.order;

    BackgroundGeolocation.getCurrentPosition((location) => {
      console.log('- getCurrentPosition success: ', location);
    }, (error) => {
      console.warn('- getCurrentPosition error: ', error);
    }, {
      persist: true,
      samples: 1,
      maximumAge: 5000
    });

    //crsytal
    // 29.3769 47.9777

    return (
      <Map
        origin={{
          // latitude: 37.78825,
          // longitude: -122.4324,

          latitude: 29.3772392006689,
          longitude: 47.98511826155676,

        }}
        destination={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
        startJob={this.onStartJobPress}
        finishJob={this.onFinishJobPress}
        updateLocation={this.onUpdateLocation}
        jobID={accepted_job.id}
        jobStatus={accepted_job.status}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(CustomerLocationMapScene);
