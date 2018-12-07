import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import AddressFormFields from 'customer/cart/components/AddressFormFields';
import Divider from 'components/Divider';
import MapButtons from 'customer/cart/components/MapButtons';
import {Title} from 'react-native-paper';
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

  static defaultProps = {
    address: {},
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
    if (!this.props.address.area) {
      return Alert.alert(
        `${I18n.t('error')}`,
        `${I18n.t('could_not_save_location')}`,
        [
          {
            text: I18n.t('ok'),
            onPress: () => {
              this.hideScreen();
            },
          },
        ],
      );
    } else {
      this.props.onSave({
        ...this.state,
        id: this.props.address.id,
        area_id: this.props.address.area ? this.props.address.area.id : null,
      });
    }
  };

  updateFormFields = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const {block, street, avenue, building, label, initialized} = this.state;
    let {latitude, longitude, area} = this.props.address;
    let {savingAddress} = this.props;

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 40}}>
        <KeyboardAvoidingView behavior="position">
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
          <MapButtons
            save={this.saveAddress}
            close={this.hideScreen}
            savingAddress={savingAddress}
          />
        </KeyboardAvoidingView>
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
