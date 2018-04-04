/**
 * @flow
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import DriverInfo from 'company/drivers/components/DriverInfo';
import DriverThumb from 'company/drivers/components/DriverThumb';
import SectionHeading from 'company/components/SectionHeading';
import OrdersList from 'company/orders/components/OrdersList';
import {ACTIONS as COMPANY_ACTIONS} from 'company/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';

import I18n from 'utils/locale';

class DriverDetailScene extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          driverID: PropTypes.number.isRequired,
        }),
      }),
    }),
    driver: PropTypes.object.isRequired,
  };

  static defaultProps = {
    navigation: {state: {params: {driverID: 0}}},
    driver: {user: {}},
  };

  componentDidMount() {
    this.props.dispatch(
      COMPANY_ACTIONS.fetchDriver(this.props.navigation.state.params.driverID),
    );
  }

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  

  render() {
    const {driver} = this.props;
    const {image, name, mobile, email} = driver.user;
    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentInset={{bottom: 150}}>

        <DriverThumb image={image} name={name}/>

        <DriverInfo driver={driver}/>

        {driver.working_order &&
        driver.working_order.id && (
          <View>
            <SectionHeading
              title={I18n.t('working_order')}
              onButtonPress={this.loadCurrentOrders}
            />

            <OrdersList
              items={[driver.working_order]}
              onItemPress={this.onOrdersListItemPress}
            />
          </View>
        )}

        {driver.upcoming_orders && driver.upcoming_orders.length &&
        <View>

          <SectionHeading
            title={I18n.t('upcoming_orders')}
            onButtonPress={this.loadCurrentOrders}
          />

          <OrdersList
            items={driver.upcoming_orders}
            onItemPress={this.onOrdersListItemPress}
          />

        </View>
        }

      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getDriverByID = DRIVER_SELECTORS.getDriverByID();
  const mapStateToProps = (state, props) => {
    return {
      driver: getDriverByID(state, props.navigation.state.params.driverID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(DriverDetailScene);
