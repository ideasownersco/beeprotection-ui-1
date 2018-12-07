/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as ORDER_SELECTORS} from 'driver/selectors/orders';
import {ScrollView, Text, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import PropTypes from 'prop-types';
import OrderTotal from 'customer/orders/components/OrderTotal';
import CustomerInfo from 'driver/components/CustomerInfo';
import SectionHeading from 'company/components/SectionHeading';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import Button from 'components/Button';
import MapButtons from 'driver/orders/components/MapButtons';
import BackgroundGeolocation from 'react-native-background-geolocation';
import GEOLOCATION_CONFIG from 'utils/background-geolocation';
import {API_URL, NETWORK_PROTOCOL} from 'utils/env';

class OrderDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  static defaultProps = {
    order: {},
  };

  componentDidMount() {
    let {order} = this.props;
    let {job} = order;

    this.props.dispatch(
      DRIVER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );

    BackgroundGeolocation.on('location', this.onLocation);

    BackgroundGeolocation.ready(
      {
        ...GEOLOCATION_CONFIG,
        reset: true,
        locationAuthorizationRequest: 'Any',
        url: `${NETWORK_PROTOCOL}${API_URL}/jobs/${job.id}/update/location`,
      },

      state => {
        if (!state.enabled && order.trackeable) {
          BackgroundGeolocation.start();
        }

        return {
          enabled: job.status === 'driving',
        };
      },
    );
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeListeners();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.order && nextProps.order.total) {
      this.setState({
        amount: nextProps.order.amount,
      });
    }
  }

  onLocation = location => {
    console.log('location', location);
  };

  uploadImages = () => {
    this.props.navigation.navigate('PhotosUpload', {
      orderID: this.props.order.id,
      jobID: this.props.order.job.id,
    });
  };

  printInvoice = () => {
    this.props.navigation.navigate('PrintInvoice', {
      orderID: this.props.order.id,
    });
  };

  startDriving = () => {
    let {job} = this.props.order;
    BackgroundGeolocation.start();
    BackgroundGeolocation.getCurrentPosition({
      timeout: 30, // 30 second timeout to fetch location
      persist: true, // Defaults to state.enabled
      maximumAge: 5000, // Accept the last-known-location if not older than 5000 ms.
      desiredAccuracy: 10, // Try to fetch a location with an accuracy of `10` meters.
      samples: 3, // How many location samples to attempt.
    }).then(location => {
      let {latitude, longitude} = location.coords;
      this.props.dispatch(
        DRIVER_ACTIONS.startDriving(job.id, {
          latitude: latitude,
          longitude: longitude,
        }),
      );
    });
  };

  stopDriving = () => {
    let {job} = this.props.order;
    BackgroundGeolocation.stop();
    this.props.dispatch(DRIVER_ACTIONS.stopDriving(job.id));
  };

  startWorking = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.startWorking(job.id));
  };

  stopWorking = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.stopWorking(job.id));
  };

  render() {
    let {order} = this.props;

    let {address, job} = order;

    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentContainerStyle={{paddingBottom: 50}}>
        {order.packages && (
          <View>
            <OrderBasicInfo item={order} />
            <OrderItems order={order} />
            <OrderTotal total={order.total} />

            <Button
              raised
              onPress={this.printInvoice}
              title={I18n.t('print_invoice')}
            />

            {order.user && (
              <View>
                <SectionHeading title={I18n.t('customer_info')} />
                <CustomerInfo user={order.user} />
              </View>
            )}

            <Divider style={{marginBottom: 10}} />

            <SectionHeading title={I18n.t('address')} />
            {job && (
              <View>
                <MapButtons
                  address={address}
                  startDriving={this.startDriving}
                  stopDriving={this.stopDriving}
                  startWorking={this.startWorking}
                  stopWorking={this.stopWorking}
                  jobStatus={job.status}
                />
                <Divider style={{marginBottom: 10}} />

                {!order.is_completed && (
                  <Button
                    raised
                    onPress={this.uploadImages}
                    title={I18n.t('upload_images')}
                  />
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
      orders: ORDER_SELECTORS.getUpcomingOrders(state),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(OrderDetailScene);
