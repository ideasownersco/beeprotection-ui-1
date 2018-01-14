import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DriversList from 'driver/components/DriversList';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ACTIONS as DRIVER_ACTIONS} from 'company/actions/drivers';

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

  render() {
    const {drivers} = this.props;

    return (
      <DriversList
        items={drivers}
        onItemPress={this.onDriversListItemPress}
        activeItemID={0}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    drivers: DRIVER_SELECTORS.getDrivers(state),
  };
}

export default connect(mapStateToProps)(DriversListScene);
