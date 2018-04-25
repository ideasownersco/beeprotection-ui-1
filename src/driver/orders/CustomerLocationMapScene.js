/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Map from 'driver/orders/components/Map';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import BackgroundGeolocation from 'react-native-background-geolocation';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';
import {SELECTORS as DRIVER_SELECTORS} from '../selectors/orders';
import {View} from 'react-native';
import UploadImage from '../components/UploadImage';
import ListModal from '../../components/ListModal';
import union from 'lodash';

class CustomerLocationMapScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number,
          // order: PropTypes.shape({
          //   address: PropTypes.object.isRequired,
          //   job: PropTypes.object.isRequired,
          // }),
        }),
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isUploadImageModalVisible: false,
      images: [],
      imagesUploaded: false,
      imagesApproved: false,
      origin: {
        latitude: 37.78825,
        longitude: -122.4324,
        // latitude: 29.3772392006689,
        // longitude: 47.98511826155676,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );

    BackgroundGeolocation.getCurrentPosition(
      location => {
        let {latitude, longitude} = location.coords;
        this.setState({
          origin: {
            latitude: latitude,
            longitude: longitude,
          },
        });
      },
      error => {
        console.warn('- getCurrentPosition error: ', error);
      },
      {
        persist: true,
        samples: 1,
        maximumAge: 5000,
      },
    );
  }

  onStartWorkingPress = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.startWorking(job.id));
  };

  onStopWorkingPress = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.stopWorking(job.id));
  };

  onStartDrivingPress = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.startDriving(job.id));
  };

  onStopDrivingPress = () => {
    let {job} = this.props.order;
    this.props.dispatch(DRIVER_ACTIONS.stopDriving(job.id));
  };

  onUpdateLocation = () => {
    // let {job} = this.props.navigation.state.params.order;
  };

  uploadImages = () => {
    this.showUploadImageModal();
  };

  approveImages = () => {
    this.setState({
      imagesApproved: true,
    });
  };

  onSaveUploadedImage = () => {
    this.setState({
      imagesUploaded: true,
      isUploadImageModalVisible: false,
    });
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
      isUploadImageModalVisible: true,
    });
  };

  hideUploadImageModal = () => {
    this.setState({
      isUploadImageModalVisible: false,
    });
  };

  render() {
    let {order, profile} = this.props;

    if (!order.id) {
      return null;
    }

    let {address, job} = order;
    let {origin, images} = this.state;

    return (
      <View style={{flex: 1}}>
        <Map
          origin={origin}
          destination={{
            latitude: address.latitude,
            longitude: address.longitude,
          }}
          startWorking={this.onStartWorkingPress}
          stopWorking={this.onStopWorkingPress}
          startDriving={this.onStartDrivingPress}
          stopDriving={this.onStopDrivingPress}
          updateLocation={this.onUpdateLocation}
          jobID={job.id}
          jobStatus={job.status}
          driverID={profile.id}
          address={address}
          uploadImages={this.uploadImages}
          approveImages={this.approveImages}
          imagesUploaded={this.state.imagesUploaded}
          imagesApproved={this.state.imagesApproved}
        />

        <ListModal
          isVisible={this.state.isUploadImageModalVisible}
          onCancel={this.hideUploadImageModal}
          onSave={this.onSaveUploadedImage}>
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

export default connect(makeMapStateToProps)(CustomerLocationMapScene);
