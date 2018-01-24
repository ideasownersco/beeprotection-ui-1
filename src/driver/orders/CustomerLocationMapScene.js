/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'driver/orders/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';

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
    // console.log('job started', accepted_job);
  };

  onFinishJobPress = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.finishJob(accepted_job.id));
    // console.log('job ended', accepted_job);
  };

  onUpdateLocation = () => {
    let {accepted_job} = this.props.navigation.state.params.order;
    // console.log('updating location');
  };

  render() {
    let {order} = this.props.navigation.state.params;
    let {address} = order;
    let {accepted_job} = this.props.navigation.state.params.order;

    // console.log('accepted_job', accepted_job);

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
