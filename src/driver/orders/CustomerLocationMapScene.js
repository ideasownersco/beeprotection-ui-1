/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from './components/Map';

class CustomerLocationMapScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          address: PropTypes.object.isRequired,
        }),
      }),
    }).isRequired,
  };

  render() {
    let {address} = this.props.navigation.state.params || {
      latitude: address.latitude,
      longitude: address.longitude,
    };
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

export default connect(mapStateToProps)(CustomerLocationMapScene);
