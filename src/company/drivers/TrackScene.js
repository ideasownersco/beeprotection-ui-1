import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'company/common/actions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Image, Dimensions, View, Text, WebView} from 'react-native';
import images from 'assets/theme/images';
import {SELECTORS as COMPANY__DRIVER_SELECTORS} from 'company/selectors/drivers';
import Button from 'components/Button';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import I18n from 'utils/locale';
import Platform from 'react-native';

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
    initialized:false
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
    this.props.dispatch(DRIVER_ACTIONS.subscribeToDriverTrackings());

    setTimeout(()=>{
      this.setState({
        initialized:true
      })
    },1000)
  }

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail', {
      driverID: driver.id,
    });
  };

  onMapLayout = () => {
    this.map.fitToElements(true);
    // this.map.fitToCoordinates(this.props.drivers, {
    //   edgePadding: DEFAULT_PADDING,
    //   animated: true,
    // });
  };

  componentDidUpdate(nextProps) {
    // if (this.props.drivers !== nextProps.drivers) {
    //   if (!this.state.pauseTrackingUpdate) {
    //     this.onMapLayout();
    //   }
    // }
  }

  resumeTrackingUpdate = () => {
    this.setState({
      pauseTrackingUpdate: false,
    },()=>{
      this.onMapLayout();
    });
  };

  pauseTrackingUpdate = () => {
    this.setState({
      pauseTrackingUpdate: true,
    });
  };

  render() {
    let {drivers} = this.props;

    // drivers.map(driver => {
    //   console.log('driver.latitude',driver.latitude);
    // });

    let origin = {
      // latitude: 37.48522,
      // longitude: -122.23635,
      latitude: 29.3772392006689,
      longitude: 47.98511826155676,
      heading: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    //
    // let drivers = [
    //   {
    //     driver_id: 1,
    //     heading: 305.16,
    //     job_id: '1',
    //     latitude: 37.49844611,
    //     longitude: -122.31576031,
    //   },
    //   {
    //     driver_id: 2,
    //     heading: 305.16,
    //     job_id: '2',
    //     latitude: 37.33182,
    //     longitude: -122.03118,
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
          showsUserLocation={false}
          showsMyLocationButton={false}
          onLongPress={this.pauseTrackingUpdate}
          onPress={this.pauseTrackingUpdate}
        >
          {drivers.map((driver, index) => {
            // const {heading} = driver;
            // const rotate =
            //   typeof heading === 'number' && heading >= 0
            //     ? `${heading}deg`
            //     : undefined;
            // return (
            //   <MapView.Marker
            //     key={`${index}`}
            //     anchor={{x: 0.5, y: 0.5, position: 'relative'}}
            //     coordinate={{...driver}}
            //     identifier="MarkerOrigin"
            //     mapPadding={5}
            //   >
            //     <View>
            //       <MapView.Callout tooltip style={{minWidth: 100, maxWidth: 300}}>
            //           <Text style={{fontSize:19,fontWeight:'500',color:'red'}}>Driver</Text>
            //       </MapView.Callout>
            //
            //       <Image
            //         source={images.car}
            //         style={[
            //           {
            //             width: 20,
            //             height: 40,
            //           },
            //           // rotate && {transform: [{rotate}]},
            //         ]}
            //       />
            //     </View>
            //   </MapView.Marker>
            // );

            console.log('drivers',drivers);


            if(this.state.initialized) {
              return (
                <MapView.Marker
                  // provider={PROVIDER_GOOGLE}
                  // ref={'ref' + driver._id}
                  // key={'key' + driver._id}
                  // // anchor={{x: 0.5, y: 0.5, position: 'relative'}}
                  // coordinate={{...driver}}
                  // tracksViewChanges={true}
                  // identifier="MarkerOrigin"
                  // mapPadding={5}

                  key={`${index}`}
                  anchor={{x: 0.5, y: 0.5, position: 'relative'}}
                  coordinate={{...driver}}
                  identifier="MarkerOrigin"
                  mapPadding={5}
                >
                  <Image
                    // source={{uri: property.images[0]}}
                    // style={[styles.image]}
                    source={images.car}
                    style={[
                      {
                        width: 20,
                        height: 40,
                      },
                      // rotate && {transform: [{rotate}]},
                    ]}
                    resizeMode="cover"
                  />
                  <MapView.Callout onPress={() => {}} tracksViewChanges={true}>
                    <View style={{flex:1,width:100,height:30,justifyContent:'center'}}>
                      <Text style={{fontSize:19}}>{driver.user ? driver.user.name : 'Driver'}</Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              );

            }


            // return (
            //   <MapView.Marker
            //     key={`${index}`}
            //     anchor={{x: 0.5, y: 0.5, position: 'relative'}}
            //     coordinate={{...driver}}
            //     identifier="MarkerOrigin"
            //     mapPadding={5}
            //   >
            //     <Image
            //       source={images.car}
            //       style={[
            //         {
            //           width: 20,
            //           height: 40,
            //         },
            //         // rotate && {transform: [{rotate}]},
            //       ]}
            //     />
            //   </MapView.Marker>
            // );
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
