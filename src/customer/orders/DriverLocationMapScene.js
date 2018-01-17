/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'customer/orders/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';

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

  componentDidMount() {
    const {accepted_job} = this.props.navigation.state.params.order;
    console.log('compone',accepted_job);

    this.props.dispatch(CUSTOMER_ACTIONS.subscribeToJobTrack({
      job_id:accepted_job.id
    }))
  }


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
