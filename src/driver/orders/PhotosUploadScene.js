/**
 * @flow
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'driver/selectors/orders';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import I18n from 'utils/locale';
import {FAB} from "react-native-paper";
import UploadImage from 'driver/components/UploadImage';
import ListModal from 'components/ListModal';
import PhotosList from "driver/components/PhotosList";
import colors from "assets/theme/colors";
import Dialog from "components/Dialog";
import ImagePicker from 'react-native-image-crop-picker';

class PhotosUploadScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
          jobID: PropTypes.number.isRequired,
        }),
      }),
    }).isRequired,
  };

  static defaultProps = {
    order: {},
  };

  state = {
    showUploadImageModal: false,
    images:[],
    showImageUploadOptionsDialog:false
  };

  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchJobPhotos(
        this.props.navigation.state.params.jobID,
      ),
    );
  }

  onImageUploadButtonPress = () => {
    this.showImageUploadOptions();
  };

  showImageUploadOptions = () => {
    this.setState({
      showImageUploadOptionsDialog: true,
    });
  };

  hideImageUploadOptions = () => {
    this.setState({
      showImageUploadOptionsDialog: false,
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

  onSaveUploadedImage = () => {
    this.setState({
      imagesUploaded: true,
    });

    this.props.dispatch(DRIVER_ACTIONS.uploadImages({
      job_id:this.props.order.job.id,
      images:this.state.images
    }));

    // this.hideUploadImageModal();

  };

  deleteImage = image => {
    this.setState({
      images: this.state.images.filter(
        uploadedImage => uploadedImage !== image,
      ),
    });
  };

  approveImages = () => {
    this.setState({
      imagesApproved: true,
    });
  };

  uploadImage = images => {
    this.setState({
      images: images,
    });
  };

  onPhotoListItemPress = () => {
  };

  onPhotoListItemDeletePress = () => {
  };

  uploadFromAlbum = () => {
    this.hideImageUploadOptions();
    this.showUploadImageModal();
  };

  uploadFromCamera = () => {
    this.hideImageUploadOptions();

    ImagePicker.openCamera({
      multiple:true,
      cropping: false,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      
      this.props.dispatch(DRIVER_ACTIONS.uploadImages({
        job_id:this.props.order.job.id,
        images:[image]
      }))
      
    }).catch(e => alert(e));

  };

  onImageUploadOptionsDialogDismiss = () => {
    this.hideImageUploadOptions();
  };

  render() {
    let {order} = this.props;

    let {
      showUploadImageModal,
      images,
      showImageUploadOptionsDialog
    } = this.state;

    return (
      <View
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentContainerStyle={{paddingBottom: 50}}
      >
        <PhotosList
          items={order.job.photos || []}
          onItemPress={this.onPhotoListItemPress}
          onItemDeletePress={this.onPhotoListItemDeletePress}
        />

        <FAB
          icon="add"
          dark
          onPress={this.onImageUploadButtonPress}
          medium
          style={{
            left: 20,
            bottom: 20,
            backgroundColor: colors.primary,
          }}
        />

        <Dialog
          title={I18n.t('upload_images')}
          onDismiss={this.onImageUploadOptionsDialogDismiss} dismissable={true} leftButtonText={I18n.t('upload_from_album').toUpperCase()} rightButtonText={I18n.t('upload_from_camera').toUpperCase()} leftButtonPress={this.uploadFromAlbum} rightButtonPress={this.uploadFromCamera} visible={showImageUploadOptionsDialog}/>

        <ListModal
          onCancel={this.hideUploadImageModal}
          onSave={this.onSaveUploadedImage}
          isVisible={showUploadImageModal}>
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
  const getOrderByID = DRIVER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
      orders: DRIVER_SELECTORS.getUpcomingOrders(state),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(PhotosUploadScene);
