/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'driver/orders/components/Map';
import {ACTIONS} from 'driver/common/actions';
import {SELECTORS as ORDER_SELECTORS} from "driver/selectors/orders";
import {bindActionCreators} from "redux";
import LoadingIndicator from "/components/LoadingIndicator";
import {View,} from 'react-native';

class CustomerLocationMapScene extends Component {

  // componentDidMount() {
  //   this.props.actions.fetchOrderDetails(this.props.navigation.state.params.orderID);
  // }

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired
        }),
      }),
    }).isRequired,
  };

  static defaultProps = {
    order: {
      address: {}
    }
  };

  constructor(props) {
    super(props);

    this.origin = {
      latitude: 37.78825,
      longitude: -122.4324,
      // latitude: 29.3772392006689,
      // longitude: 47.98511826155676,
    };

    // BackgroundGeolocation.getCurrentPosition((location) => {
    //   let {latitude, longitude} = location.coords;
    //   this.origin = {
    //     latitude: latitude,
    //     longitude: longitude
    //   }
    // }, (error) => {
    //   console.warn('- getCurrentPosition error: ', error);
    // }, {
    //   persist: true,
    //   samples: 1,
    //   maximumAge: 5000
    // });

  }

  onStartWorkPress = () => {
    this.props.actions.startWorking(this.props.order.id);
  };

  onFinishJobPress = () => {
    this.props.actions.finishWorking(this.props.order.id);
  };

  onUpdateLocation = () => {
    // let {accepted_job} = this.props.navigation.state.params.order;
  };

  render() {

    // let {order} = this.props;
    let {order} = this.props.navigation.state.params;
    let {address} = order;


    console.log('rendered driver customer location scene');

    if (order && order.accepted_job) {
      return (

          <Map
            origin={this.origin}
            destination={{
              latitude: address.latitude,
              longitude: address.longitude,
            }}
            startWorking={this.onStartWorkPress}
            finishWorking={this.onFinishJobPress}
            updateLocation={this.onUpdateLocation}
            orderID={order.id}
            jobStatus={order.accepted_job.status}
          />

      )
    }

    return <LoadingIndicator/>;
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...ACTIONS,},
      dispatch,
    ),
  };
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
    };
  };

  return mapStateToProps;

};
export default connect(makeMapStateToProps, mapDispatchToProps)(CustomerLocationMapScene);
