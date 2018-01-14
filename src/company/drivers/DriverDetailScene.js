/**
 * @flow
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import DriverInfo from 'company/drivers/components/DriverInfo';
import DriverThumb from './components/DriverThumb';
import SectionHeading from '../components/SectionHeading';
import OrdersList from '../orders/components/OrdersList';
import {SELECTORS as ORDER_SELECTORS} from '../selectors/orders';
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
    // this.props.dispatch(DRIVER_ACTIONS.fetchDrivers());
  }

  render() {
    const {driver, current_orders} = this.props;
    const {image, name, mobile, email} = driver.user;
    return (
      <View
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentInset={{bottom: 150}}>
        <DriverThumb image={image} name={name} />

        <DriverInfo driver={driver} />

        <SectionHeading
          title={I18n.t('current_orders')}
          buttonTitle={I18n.t('view_all')}
          onButtonPress={this.loadCurrentOrders}
        />

        <OrdersList
          items={current_orders}
          onItemPress={this.onOrdersListItemPress}
          activeItemID={0}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    driver: {
      id: 1,
      user: {
        id: 1,
        name: 'zal',
        mobile: '97979903',
        image: null,
        email: 'z4ls@live.com',
      },
      available: 1,
      active: 1,
    },
    current_orders: ORDER_SELECTORS.getOrders(state),
  };
}

export default connect(mapStateToProps)(DriverDetailScene);
