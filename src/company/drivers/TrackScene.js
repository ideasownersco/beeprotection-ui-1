import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ACTIONS as DRIVER_ACTIONS} from 'company/common/actions';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Image, Dimensions, View, Text, AppState} from 'react-native';
import images from 'assets/theme/images';
import {SELECTORS as COMPANY__DRIVER_SELECTORS} from 'company/selectors/trackings';
import Button from 'components/Button';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.3;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import I18n from 'utils/locale';

class TrackScene extends PureComponent {
  static propTypes = {
    trackings: PropTypes.array.isRequired,
  };

  static defaultProps = {
    trackings: [],
  };

  state = {
    pauseTrackingUpdate: false,
    initialized:false,
    appState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    this.props.dispatch(DRIVER_ACTIONS.fetchtrackings());
    this.props.dispatch(DRIVER_ACTIONS.subscribeToDriverTrackings());

    setTimeout(()=>{
      this.setState({
        initialized:true
      })
    },1000)
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.props.dispatch(DRIVER_ACTIONS.subscribeToDriverTrackings());
    }
    this.setState({appState: nextAppState});
  };

  onMapLayout = () => {
    this.map.fitToElements(true);
  };

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

  ontrackingsListItemPress = (orderID) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: orderID,
    });
  };

  render() {
    let {trackings} = this.props;

    let origin = {
      latitude: 29.3772392006689,
      longitude: 47.98511826155676,
      heading: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };

    return (
      <View style={{flex: 1}}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{flex: 1}}
          initialRegion={origin}
          onMapReady={this.onMapLayout}
          showsUserLocation={false}
          showsMyLocationButton={false}
          onLongPress={this.pauseTrackingUpdate}
          onPress={this.pauseTrackingUpdate}
        >
          {trackings.map((tracking, index) => {
            const {heading} = tracking;
            const rotate =
              typeof heading === 'number' && heading >= 0
                ? `${heading}deg`
                : undefined;

            if(this.state.initialized) {
              return (
                <MapView.Marker
                  key={`${index}`}
                  anchor={{x: 0.5, y: 0.5, position: 'relative'}}
                  coordinate={{...tracking}}
                  identifier="MarkerOrigin"
                  mapPadding={5}
                >
                  <Image
                    source={images.car}
                    style={[
                      {
                        width: 20,
                        height: 40,
                      },
                      rotate && {transform: [{rotate}]},
                    ]}
                    resizeMode="cover"
                  />
                  <MapView.Callout onPress={() => this.ontrackingsListItemPress(tracking.order_id)} tracksViewChanges={true}>
                    <View style={{flex:1,width:100,height:30,justifyContent:'center'}}>
                      <Text style={{fontSize:19}}>{tracking.user ? tracking.user.name : `Driver ${tracking.id}`}</Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              );
            }
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
    trackings: COMPANY__DRIVER_SELECTORS.getDriverTrackings(state),
  };
}

export default connect(mapStateToProps)(TrackScene);
