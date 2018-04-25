/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/selectors/orders';
import {View, Linking} from 'react-native';
import Map from 'components/Map';
import UploadImage from 'driver/components/UploadImage';
import ListModal from 'components/ListModal';
import MapButtons from 'driver/orders/components/MapButtons';
import {API_URL} from 'utils/env';

class TrackOrderScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number,
        }),
      }),
    }).isRequired,
  };

  state = {

    tracking_enabled: false,
    showUploadImageModal: false,
    images: [],
    imagesUploaded: false,
    imagesApproved: false,
    latitude: 37.78825,
    longitude: -122.4324,
    heading: 0
    // latitude: 29.3772392006689,
    // longitude: 47.98511826155676,
  };

  componentDidMount() {
    BackgroundGeolocation.stop();

    let {order, profile} = this.props;
    let {job} = order;

    this.props.dispatch(
      DRIVER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );

    BackgroundGeolocation.on('location', this.onLocation);
    BackgroundGeolocation.on('http', this.onHttp);

    BackgroundGeolocation.configure(
      {
        distanceFilter: 1,
        stopOnTerminate: false,
        preventSuspend: false,
        startOnBoot: true,
        foregroundService: true,
        url: `http://${API_URL}/jobs/${job.id}/update/location`,
        autoSync: true,
        debug: true,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        maxRecordsToPersist: 1,
        params: {
          driver_id: profile.id,
        },
      },
      state => {
        this.setState({
          tracking_enabled: job.status === 'driving',
        });
      },
    );

    // BackgroundGeolocation.getCurrentPosition(
    //   location => {
    //     let {latitude, longitude} = location.coords;
    //     this.setState({
    //         latitude: latitude,
    //         longitude: longitude,
    //     });
    //   },
    //   error => {
    //     console.warn('- getCurrentPosition error: ', error);
    //   },
    //   {
    //     persist: true,
    //     samples: 1,
    //     maximumAge: 5000,
    //   },
    // );
  }

  componentWillUnmount() {
    BackgroundGeolocation.un('location', this.onLocation);
  }

  onLocation = location => {
    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      heading: location.coords.heading,
    });
  };

  onHttp = response => {
    // console.log('[event] http: ', response);
  };

  startDriving = () => {
    if (!this.state.tracking_enabled) {
      this.setState({
        tracking_enabled: true,
      });
    }
    let {job} = this.props.order;
    BackgroundGeolocation.start();
    this.props.dispatch(DRIVER_ACTIONS.startDriving(job.id));
  };

  stopDriving = () => {
    if (this.state.tracking_enabled) {
      this.setState({
        tracking_enabled: false,
      });
    }
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

  onUpdateLocation = () => {
    // let {job} = this.props.navigation.state.params.order;
  };

  approveImages = () => {
    this.setState({
      imagesApproved: true,
    });
  };

  onSaveUploadedImage = () => {
    this.setState({
      imagesUploaded: true,
    });
    this.hideUploadImageModal();
  };

  uploadImage = images => {
    this.setState({
      images: images,
    });
  };

  deleteImage = image => {
    this.setState({
      images: this.state.images.filter(
        uploadedImage => uploadedImage !== image,
      ),
    });
  };

  showUploadImageModal = () => {
    this.setState({
      showUploadImageModal: true,
    });
  };

  hideUploadImageModal = () => {
    this.setState({
      showUploadImageModal: false,
    });
  };

  openInGoogleMaps = () => {
    let {latitude, longitude} = this.props.destination;
    const nativeGoogleUrl = `comgooglemaps://?daddr=${latitude},${longitude}&center=${latitude},${longitude}&zoom=14&views=traffic&directionsmode=driving`;
    Linking.canOpenURL(nativeGoogleUrl).then(supported => {
      const url = supported
        ? nativeGoogleUrl
        : `http://maps.google.com/?q=loc:${latitude}+${longitude}`;
      Linking.openURL(url);
    });
  };


  render() {
    let {order} = this.props;

    if (!order.id) {
      return null;
    }

    let {address, job} = order;
    let {latitude, longitude, heading, images, imagesUploaded, imagesApproved, showUploadImageModal,showStartWorkingDialog,showStartDrivingDialog,showStopDrivingDialog,showStopWorkingDialog} = this.state;

    return (
      <View style={{flex: 1}}>
        <Map
          origin={{
            latitude: latitude,
            longitude: longitude,
            heading: heading
          }}
          destination={{
            latitude: address.latitude,
            longitude: address.longitude,
          }}
          updateLocation={this.onUpdateLocation}
        />

        <MapButtons
          address={address}
          uploadImages={this.showUploadImageModal}
          approveImages={this.approveImages}
          onDirectionPress={this.openInGoogleMaps}
          startDriving={this.startDriving}
          stopDriving={this.stopDriving}
          startWorking={this.startWorking}
          stopWorking={this.stopWorking}
          imagesUploaded={imagesUploaded}
          imagesApproved={imagesApproved}
          jobStatus={job.status}
        />

        <ListModal
          onCancel={this.hideUploadImageModal}
          onSave={this.onSaveUploadedImage}>
          isVisible={showUploadImageModal}
          <UploadImage
            images={images}
            updateImage={this.uploadImage}
            deleteImage={this.deleteImage}
          />
        </ListModal>


      </View>
    );
  }
}

const makeMapStateToProps = () => {
  let getOrderByID = DRIVER_SELECTORS.getOrderByID();

  return function mapStateToProps(state, ownProps) {
    return {
      profile: AUTH_SELECTORS.getAuthUserProfile(state),
      order: getOrderByID(state, ownProps.navigation.state.params.orderID),
    };
  };
};

export default connect(makeMapStateToProps)(TrackOrderScene);
