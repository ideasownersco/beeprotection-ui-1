import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DriversList from 'driver/components/DriversList';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ACTIONS as DRIVER_ACTIONS} from 'company/common/actions';
import {View} from 'react-native';
import {FAB} from 'react-native-paper';
import colors from 'assets/theme/colors';

class DriversListScene extends PureComponent {
  static propTypes = {
    drivers: PropTypes.array.isRequired,
  };

  static defaultProps = {
    drivers: [],
  };

  componentDidMount() {
    this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
  }

  onDriversListItemPress = (driver: object) => {
    this.props.navigation.navigate('DriverDetail', {
      driverID: driver.id,
    });
  };

  onAddPress = () => {
    this.props.navigation.navigate('DriverAdd', {
      userType: 'driver',
    });
  };

  render() {
    const {drivers} = this.props;

    return (
      <View style={{flex: 1}}>
        <DriversList
          items={drivers}
          onItemPress={this.onDriversListItemPress}
          activeItemID={0}
        />
        <FAB
          icon="add"
          dark
          onPress={this.onAddPress}
          medium
          style={{
            left: 20,
            bottom: 20,
            backgroundColor: colors.primary,
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    drivers: DRIVER_SELECTORS.getDrivers(state),
  };
}

export default connect(mapStateToProps)(DriversListScene);
