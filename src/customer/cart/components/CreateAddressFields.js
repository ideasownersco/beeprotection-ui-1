import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import I18n from 'utils/locale';
import MapPicker from 'customer/cart/components/MapPicker';
import colors from 'assets/theme/colors';
import AddressFormFields from 'customer/cart/components/AddressFormFields';
import BackgroundGeolocation from 'react-native-background-geolocation';
import Divider from 'components/Divider';
import SelectArea from 'customer/cart/components/SelectArea';
import MapButtons from 'customer/cart/components/MapButtons';
import {Title} from 'react-native-paper';
import Map from 'components/Map';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class extends PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let {block, street, avenue, building} = this.props.address;

    this.state = {
      label: 'Home',
      block: block,
      street: street,
      avenue: avenue,
      building: building,
      initialized: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initialized: true,
      });
    }, 1000);
  }

  hideScreen = () => {
    this.props.onCancel();
  };

  saveAddress = () => {
    this.props.onSave({
      ...this.state,
      id: this.props.address.id,
      area_id: this.props.address.area.id,
    });
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const {block, street, avenue, building, label, initialized} = this.state;
    let {latitude, longitude, area} = this.props.address;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.map}>
          {initialized && (
            <MapView
              ref={ref => (this.map = ref)}
              style={{
                height: 250,
              }}
              initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
              cacheEnabled={true}>
              <MapView.Marker
                coordinate={{
                  latitude: latitude,
                  longitude: longitude,
                }}
                // centerOffset={{x: -18, y: -60}}
                // anchor={{x: 0.69, y: 1}}
              />
            </MapView>
          )}
        </View>

        {area && (
          <Title style={{textAlign: 'center', marginTop: 10}}>
            {area.name}
          </Title>
        )}

        <Divider style={{marginVertical: 10}} />
        <AddressFormFields
          block={block}
          avenue={avenue}
          street={street}
          building={building}
          label={label}
          updateFields={this.updateFormFields}
        />
        <MapButtons save={this.saveAddress} close={this.hideScreen} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInputWrapper: {},
  searchInputContainer: {
    flexDirection: 'row',
  },
  map: {
    height: 250,
    backgroundColor: colors.lightGrey,
  },
});
