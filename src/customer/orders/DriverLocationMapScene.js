/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'customer/orders/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';

class DriverLocationMapScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          order: PropTypes.shape({
            address:PropTypes.object.isRequired,
            accepted_job:PropTypes.object.isRequired
          })
        }),
      }),
    }).isRequired,
  };

  onStartJobPress = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.startJob({
      job_id:accepted_job.id
    }));
    console.log('job started',accepted_job);
  };

  onFinishJobPress = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.finishJob({
      job_id:accepted_job.id
    }));
    console.log('job ended',accepted_job);
  };

  onUpdateLocation = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    console.log('updating location');
  };

  render() {
    let {order} = this.props.navigation.state.params;
    let {address} = order;

    return (
      <Map
        origin={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        destination={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
        startJob={this.onStartJobPress}
        finishJob={this.onFinishJobPress}
        updateLocation={this.onUpdateLocation}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(DriverLocationMapScene);
