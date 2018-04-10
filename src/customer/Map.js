import React, {Component} from 'react';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import MapPicker from "./cart/components/MapPicker";
import BackgroundGeolocation from 'react-native-background-geolocation';

class Home extends Component {

  state = {
    initialized: true,
    latitude: 29.3759,
    longitude: 47.9774,
    country: 'KW',
  };

  componentDidMount() {
    // BackgroundGeolocation.getCurrentPosition(
    //   location => {
    //     let {latitude, longitude} = location.coords;
    //     this.setState({
    //       latitude: latitude,
    //       longitude: longitude,
    //       initialized: true
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       initialized: true
    //     });
    //     console.warn('- getCurrentPosition error: ', error);
    //   },
    //   {
    //     persist: true,
    //     samples: 1,
    //     maximumAge: 5000,
    //   },
    // );
  }

  saveAddress = (address) => {
    this.setState({
        ...address
    });
  };

  render() {
    return (
      <MapPicker
        initialized={this.state.initialized}
        onClose={() => {
        }}
        visible={true}
        updateAddress={this.saveAddress}
        address={{...this.state}}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    upcoming_orders: SELECTORS.getUpcomingOrders(state),
    working_order: SELECTORS.getWorkingOrder(state),
  };
}

export default connect(mapStateToProps)(Home);
