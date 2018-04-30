import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'company/common/actions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Image, Dimensions, View} from 'react-native';
import images from 'assets/theme/images';
import {SELECTORS as COMPANY__DRIVER_SELECTORS} from 'company/selectors/drivers';
import Button from 'components/Button';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import I18n from 'utils/locale';

const DEFAULT_PADDING = {top: 100, right: 100, bottom: 100, left: 100};

class TrackScene extends PureComponent {
  static propTypes = {
    drivers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
  };

  state = {
    pauseTrackingUpdate: false,
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
    this.props.dispatch(DRIVER_ACTIONS.subscribeToDriverTrackings());
  }

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail', {
      driverID: driver.id,
    });
  };

  onMapLayout = () => {
    // this.map.fitToElements(true);
    // let drivers = [
    //   {
    //     driver_id: 1,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 29.33285,
    //     longitude: 48.05415,
    //   },
    //   {
    //     driver_id: 2,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 29.3195616,
    //     longitude: 47.991724
    //   },
    // ];
    //

    this.map.fitToCoordinates(this.props.drivers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  };

  componentDidUpdate(nextProps) {
    if (this.props.drivers !== nextProps.drivers) {
      if (!this.state.pauseTrackingUpdate) {
        this.onMapLayout();
      }
    }
  }

  resumeTrackingUpdate = () => {
    this.onMapLayout();

    this.setState({
      pauseTrackingUpdate: false,
    });
  };

  pauseTrackingUpdate = () => {
    this.setState({
      pauseTrackingUpdate: true,
    });
  };

  render() {
    let {drivers} = this.props;

    let origin = {
      // latitude: 37.48522,
      // longitude: -122.23635,
      latitude: 29.3772392006689,
      longitude: 47.98511826155676,
      heading: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    // let drivers = [
    //   {
    //     driver_id: 1,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 37.49844611,
    //     longitude: -122.31576031,
    //   },
    // ];

    // let origin = {
    //   latitude: 29.378586,
    //   longitude: 47.990341,
    //   latitudeDelta: 1,
    //   longitudeDelta: 1,
    // };

    // let drivers = [
    //   {
    //     driver_id: 1,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 29.33285,
    //     longitude: 48.05415,
    //   },
    //   {
    //     driver_id: 2,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 29.3195616,
    //     longitude: 47.991724
    //   },
    // ];

    return (
      <View style={{flex: 1}}>
        <MapView
          // provider={PROVIDER_GOOGLE}
          ref={ref => {
            this.map = ref;
          }}
          style={{flex: 1}}
          initialRegion={origin}
          onMapReady={this.onMapLayout}
          maxZoomLevel={12}
          // showsTraffic={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onLongPress={this.pauseTrackingUpdate}
          onPress={this.pauseTrackingUpdate}>
          {drivers.map((driver, index) => {
            const {heading} = driver;
            const rotate =
              typeof heading === 'number' && heading >= 0
                ? `${heading}deg`
                : undefined;

            return (
              <MapView.Marker
                key={`${index}`}
                anchor={{x: 0.5, y: 0.5, position: 'relative'}}
                coordinate={{...driver}}
                identifier="MarkerOrigin"
                mapPadding={5}>
                <Image
                  source={images.car}
                  style={[
                    {
                      width: 20,
                      height: 40,
                    },
                    rotate && {transform: [{rotate}]},
                  ]}
                />
              </MapView.Marker>
            );
          })}
        </MapView>

        {this.state.pauseTrackingUpdate && (
          <Button
            raised
            primary
            dark
            onPress={this.resumeTrackingUpdate}
            title={I18n.t('resume')}
          />
        )}
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    drivers: COMPANY__DRIVER_SELECTORS.getDriverTrackings(state),
  };
}

export default connect(mapStateToProps)(TrackScene);
