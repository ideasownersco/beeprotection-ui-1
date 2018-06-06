/**
 * @flow
 */
import React, {Component} from 'react';
import {Linking, View} from 'react-native';
import MapButtons from 'driver/orders/components/MapButtons';

export default class TrackButtons extends Component {

  render() {
    let {address,jobStatus,startDriving,stopDriving,startWorking,stopWorking} = this.props;

    return (
      <View style={{flex: 1}}>
        <MapButtons
          address={address}
          onDirectionPress={this.openInGoogleMaps}
          startDriving={startDriving}
          stopDriving={stopDriving}
          startWorking={startWorking}
          stopWorking={stopWorking}
          jobStatus={jobStatus}
        />
      </View>
    );
  }
}

// const makeMapStateToProps = () => {
//   let getOrderByID = DRIVER_SELECTORS.getOrderByID();
//
//   return function mapStateToProps(state, ownProps) {
//     return {
//       driver: AUTH_SELECTORS.getAuthUserdriver(state),
//       order: getOrderByID(state, ownProps.navigation.state.params.orderID),
//     };
//   };
// };
//
// export default connect(makeMapStateToProps)(TrackOrderScene);
