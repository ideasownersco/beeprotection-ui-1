/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/common/selectors';
import TrackItem from 'customer/orders/components/TrackItem';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import colors from 'assets/theme/colors';
import Map from "customer/orders/components/Map";
import {ACTIONS as CUSTOMER_ACTIONS} from "customer/common/actions";

class TrackDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          order: PropTypes.object.isRequired,
        }),
      }),
    }),
  };

  componentDidMount() {
    console.log('this.props',this.props);
    const {accepted_job} = this.props.navigation.state.params.order;
    console.log('compone',accepted_job);

    this.props.dispatch(CUSTOMER_ACTIONS.subscribeToJobTrack({
      job_id:accepted_job.id
    }))
  }

  static defaultProps = {
    order: {},
  };

  render() {
    let {order} = this.props.navigation.state.params;
    let {address} = order;

    let {tracking} = this.props;
    // console.log('tracking',tracking);

    let origin;
    if(tracking.latitude) {
      origin = tracking
    } else {
      origin = {
        latitude: 37.78825,
        longitude: -122.4324,
        heading:0
      }
    }

    console.log('origin',origin);

    return (
      <Map
        origin={origin}
        destination={{
          latitude: address.latitude,
          longitude: address.longitude,
        }}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getLocationUpdatesForJob = ORDER_SELECTORS.getLocationUpdatesForJob();
  const mapStateToProps = (state, props) => {
    return {
      tracking: getLocationUpdatesForJob(state, props.navigation.state.params.order.accepted_job.id),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TrackDetailScene);
