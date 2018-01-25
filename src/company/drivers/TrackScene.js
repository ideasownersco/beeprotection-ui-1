import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DriversList from 'driver/components/DriversList';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';
import {ACTIONS as DRIVER_ACTIONS} from 'company/common/actions';

class TrackScene extends PureComponent {
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

    console.log('drivers',drivers);
    return (
      null
    );
  }
}

function mapStateToProps(state) {
  return {
    drivers: DRIVER_SELECTORS.getDrivers(state),
  };
}

export default connect(mapStateToProps)(TrackScene);
