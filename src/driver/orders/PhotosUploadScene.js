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
import {FAB} from 'react-native-paper';
import UploadImage from 'driver/components/UploadImage';
import ListModal from 'components/ListModal';
import PhotosList from 'driver/components/PhotosList';
import colors from 'assets/theme/colors';
import Dialog from 'components/Dialog';
import ImagePicker from 'react-native-image-crop-picker';
import Button from 'components/Button';
import FormTextInput from 'components/FormTextInput';

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
    order: {
      job: {
        photos: [],
      },
    },
  };

  state = {
    showUploadImageModal: false,
    images: [],
    showImageUploadOptionsDialog: false,
    imageApprovalDialogVisible: false,
    comment: null,
    uploading: false,
  };

  componentDidMount() {
    this.props.dispatch(
      DRIVER_ACTIONS.fetchJobPhotos(this.props.navigation.state.params.jobID),
    );
  }

  onImageUploadButtonPress = () => {
    this.showImageUploadOptions();
  };

  showImageApprovalDialog = () => {
    this.setState({
      imageApprovalDialogVisible: true,
    });
  };

  hideImageApprovalDialog = () => {
    this.setState({
      imageApprovalDialogVisible: false,
    });
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

  deleteImage = image => {
    this.setState({
      images: this.state.images.filter(
        uploadedImage => uploadedImage !== image,
      ),
    });
  };

  approveImages = () => {
    this.hideImageApprovalDialog();
    this.props.dispatch(
      DRIVER_ACTIONS.approveImages({
        job_id: this.props.order.job.id,
        comment: this.state.comment,
      }),
    );
    this.props.navigation.pop();
  };

  uploadImage = images => {
    this.setState({
      images: images,
    });
  };

  onPhotoListItemPress = () => {};

  onPhotoListItemDeletePress = () => {};

  uploadFromAlbum = () => {
    this.hideImageUploadOptions();
    this.showUploadImageModal();
  };

  uploadImages = images => {
    this.setState({
      uploading: true,
    });

    return new Promise((resolve, reject) => {
      this.props.dispatch(
        DRIVER_ACTIONS.uploadImages({
          job_id: this.props.order.job.id,
          images,
          resolve,
          reject,
        }),
      );
    })
      .then(imgs => {
        this.setState({
          uploading: false,
        });
        this.hideUploadImageModal();
      })
      .catch(e => {
        this.setState({
          uploading: false,
        });
        this.hideUploadImageModal();
      });
  };

  onSaveUploadedImage = () => {
    let {images} = this.state;
    this.setState({
      imagesUploaded: true,
    });
    this.uploadImages(images);
  };

  uploadFromCamera = () => {
    this.hideImageUploadOptions();

    ImagePicker.openCamera({
      multiple: false,
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      compressImageQuality: 0.3,
    })
      .then(image => {
        this.uploadImages([image.path]);
      })
      .catch(e => console.log('error', e));
  };

  onImageUploadOptionsDialogDismiss = () => {
    this.hideImageUploadOptions();
  };

  onFieldChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    let {order} = this.props;
    let {job} = order;

    let {
      showUploadImageModal,
      images,
      showImageUploadOptionsDialog,
      imageApprovalDialogVisible,
    } = this.state;

    return (
      <View
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentContainerStyle={{paddingBottom: 50}}>
        <PhotosList
          items={order.job.photos || []}
          onItemPress={this.onPhotoListItemPress}
          onItemDeletePress={this.onPhotoListItemDeletePress}
        />

        {job &&
          job.photos && (
            <View>
              <View style={{padding: 10, backgroundColor: 'white'}}>
                <FormTextInput
                  field="comment"
                  onValueChange={this.onFieldChange}
                  label={I18n.t('comment')}
                />
              </View>
              <Button
                title={I18n.t('approve_images')}
                onPress={this.showImageApprovalDialog}
                raised
                // disabled={order.job.photos_approved}
                style={{margin: 20, marginBottom: 50}}
              />
            </View>
          )}

        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <FAB
            icon="add"
            dark
            onPress={this.onImageUploadButtonPress}
            medium
            style={{
              bottom: 20,
              backgroundColor: colors.primary,
            }}
          />
        </View>

        <Dialog
          title={I18n.t('approve_images_confirm')}
          rightButtonText={I18n.t('yes').toUpperCase()}
          leftButtonPress={this.hideImageApprovalDialog}
          rightButtonPress={this.approveImages}
          visible={imageApprovalDialogVisible}
        />

        <Dialog
          title={I18n.t('upload_images')}
          onDismiss={this.onImageUploadOptionsDialogDismiss}
          dismissable={true}
          leftButtonText={I18n.t('upload_from_album').toUpperCase()}
          rightButtonText={I18n.t('upload_from_camera').toUpperCase()}
          leftButtonPress={this.uploadFromAlbum}
          rightButtonPress={this.uploadFromCamera}
          visible={showImageUploadOptionsDialog}
        />

        <ListModal
          onCancel={this.hideUploadImageModal}
          onSave={this.onSaveUploadedImage}
          isVisible={showUploadImageModal}
          disabled={this.state.uploading}
          buttonText={this.state.uploading ? 'uploading' : I18n.t('save')}>
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
