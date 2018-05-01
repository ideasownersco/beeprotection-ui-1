import React, {Component} from 'react';
import {SELECTORS} from 'customer/selectors/orders';
import {connect} from 'react-redux';
import CreateAddressForm from 'customer/cart/components/CreateAddress';
import BackgroundGeolocation from 'react-native-background-geolocation';

class Home extends Component {
  // componentDidMount() {
  //   BackgroundGeolocation.getCurrentPosition(
  //     location => {
  //       let {latitude, longitude} = location.coords;
  //       this.setState({
  //         latitude: latitude,
  //         longitude: longitude,
  //         initialized: true
  //       });
  //     },
  //     error => {
  //       this.setState({
  //         initialized: true
  //       });
  //       console.warn('- getCurrentPosition error: ', error);
  //     },
  //     {
  //       persist: true,
  //       samples: 1,
  //       maximumAge: 5000,
  //     },
  //   );
  // }

  saveAddress = address => {
    console.log('address', address);

    this.setState({
      ...address,
    });
  };

  setArea = id => {
    this.setState({
      area_id: id,
    });
  };

  hideCreateAddressForm = () => {};

  render() {
    return (
      <CreateAddressForm
        visible={true}
        onSave={this.saveAddress}
        onCancel={this.hideCreateAddressForm}
        areas={[
          {
            id: 7,
            name: 'Abbasiya',
            active: 1,
            latitude: 29.264,
            longitude: 47.944,
          },
          {
            id: 8,
            name: 'Abdullah Al-Mubarak',
            active: 1,
            latitude: 29.368,
            longitude: 47.98,
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
