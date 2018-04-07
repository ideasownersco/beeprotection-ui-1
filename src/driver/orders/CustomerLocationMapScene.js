/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'driver/orders/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';

class CustomerLocationMapScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          order: PropTypes.shape({
            address: PropTypes.object.isRequired,
            job: PropTypes.object.isRequired,
          }),
        }),
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      origin: {
        latitude: 37.78825,
        longitude: -122.4324,
        // latitude: 29.3772392006689,
        // longitude: 47.98511826155676,
      },
    };
  }

  componentDidMount() {
    BackgroundGeolocation.getCurrentPosition(
      location => {
        let {latitude, longitude} = location.coords;
        this.setState({
          origin: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      },
      error => {
        console.warn('- getCurrentPosition error: ', error);
      },
      {
        persist: true,
        samples: 1,
        maximumAge: 5000,
      },
    );
  }

  onStartJobPress = () => {
    let {job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.startJob(job.id));
  };

  onFinishJobPress = () => {
    let {job} = this.props.navigation.state.params.order;
    this.props.dispatch(DRIVER_ACTIONS.finishJob(job.id));
  };

  onUpdateLocation = () => {
    // let {job} = this.props.navigation.state.params.order;
  };

  render() {
    let {order} = this.props.navigation.state.params;
    let {address} = order;
    let {job} = this.props.navigation.state.params.order;
    let {origin} = this.state;

    let {profile} = this.props;

    return (
      <Map
        origin={origin}
        destination={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
        startJob={this.onStartJobPress}
        finishJob={this.onFinishJobPress}
        updateLocation={this.onUpdateLocation}
        jobID={job.id}
        jobStatus={job.status}
        driverID={profile.id}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: AUTH_SELECTORS.getAuthUserProfile(state),
  };
}
export default connect(mapStateToProps)(CustomerLocationMapScene);
