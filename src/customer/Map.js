import React, {Component} from 'react';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import MapPicker from './cart/components/MapPicker';
import BackgroundGeolocation from 'react-native-background-geolocation';

class Home extends Component {
  state = {
    initialized: true,
    latitude: 29.3759,
    longitude: 47.9774,
    country: 'KW',
    area_id: 7,
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

  saveAddress = address => {
    this.setState({
      ...address,
    });
  };

  setArea = id => {
    this.setState({
      area_id: id,
    });
  };

  render() {
    return (
      <MapPicker
        initialized={this.state.initialized}
        onClose={() => {}}
        visible={true}
        updateAddress={this.saveAddress}
        address={{...this.state}}
        areas={[
          {
            id: 7,
            name: 'Abbasiya',
            active: 1,
            latitude: 29.2643154,
            longitude: 47.94439999999999,
          },
          {
            id: 8,
            name: 'Abdullah Al-Mubarak',
            active: 1,
            latitude: 29.3680874,
            longitude: 47.9805976,
          },
        ]}
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
