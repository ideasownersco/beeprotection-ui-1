/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import {ScrollView, View} from 'react-native';
import OrderItems from 'customer/orders/components/OrderItems';
import OrderBasicInfo from 'customer/orders/components/OrderBasicInfo';
import OrderTotal from 'customer/orders/components/OrderTotal';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'customer/common/actions';
import DriverInfo from 'driver/components/DriverInfo';
import SectionHeading from '../../company/components/SectionHeading';
import I18n from 'utils/locale';

class OrderDetailScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  static defaultProps = {
    orderID: 0,
  };

  componentDidMount() {
    this.props.actions.fetchOrderDetails(
      this.props.navigation.state.params.orderID,
    );
  }

  render() {
    let {order} = this.props;
    console.log('order', order);

    return (
      <View style={{flex: 1}}>
        {order && (
          <ScrollView style={{flex: 1}}>
            <OrderBasicInfo item={order} />
            <OrderItems order={order} />
            <OrderTotal total={order.total} />

            {order.job &&
              order.job.driver &&
              order.job.driver &&
              order.job.driver.user && (
                <View>
                  <SectionHeading title={I18n.t('driver_info')} />
                  <DriverInfo driver={order.job.driver} />
                </View>
              )}
          </ScrollView>
        )}
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...ACTIONS}, dispatch),
  };
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps, mapDispatchToProps)(
  OrderDetailScene,
);
