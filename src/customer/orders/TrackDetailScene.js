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

  static defaultProps = {
    order: {},
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
      />
    );
  }
}

const makeMapStateToProps = () => {
  const mapStateToProps = (state, props) => {
    return {
      state
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TrackDetailScene);
