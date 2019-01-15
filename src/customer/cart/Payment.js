/**
 * @flow
 */
import React, {Component} from 'react';
import {View, WebView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {PAYMENT_ENDPOINT} from 'utils/env';
import Dialog from 'components/Dialog';
import I18n from 'utils/locale';
import Modal from 'react-native-modal';
import OrderSuccess from './components/OrderSuccess';
import {ACTIONS, ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {bindActionCreators} from 'redux';
import {
  SELECTORS,
  SELECTORS as ORDER_SELECTORS,
} from 'customer/selectors/orders';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

class Payment extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    order: {},
  };

  state = {
    scene: 'payment',
  };

  onNavigationStateChange = navState => {
    const successUrl = `${PAYMENT_ENDPOINT}/payment/knet/success`;
    const failureUrl = `${PAYMENT_ENDPOINT}/payment/knet/failure`;

    if (navState.url.includes('success')) {
      this.setState({
        scene: 'success',
      });

      this.props.actions.setPaymentSuccess({
        order_id: this.props.navigation.getParam('orderID'),
      });
    } else if (navState.url === failureUrl) {
      this.setState({
        scene: 'failed',
      });
    } else {
    }
  };

  fetchTimings = (date = null) => {
    let {isFreeWash} = this.props.cart;
    this.props.actions.fetchTimings({
      date: date ? date : this.props.cart.selectedDate,
      items: this.props.cart.items,
      free_wash: isFreeWash,
    });
  };

  paymentFailedDialogPress = () => {};

  paymentSuccessDialogPress = () => {
    this.onPaymentSuccess();
    this.props.navigation.replace('Home');
    let orderID = this.props.navigation.getParam('orderID');
    this.props.navigation.navigate('OrderDetail', {
      orderID: orderID,
    });
  };

  onPaymentSuccess = () => {
    this.fetchTimings();
    this.props.actions.flushCart();
    this.props.actions.fetchWorkingOrders({
      force: true,
    });
    this.props.navigation.popToTop();
    this.props.actions.setCartItem('isFreeWash', false);
  };

  render() {
    let {scene} = this.state;

    let orderID = this.props.navigation.getParam('orderID');
    let url = `${PAYMENT_ENDPOINT}/${orderID}/checkout`;
    // let url = `http://beeprotection.test/knet-pay`;
    // let url = `http://beeprotection.test/knet-pay`;

    switch (scene) {
      case 'payment':
        return (
          <WebView
            source={{uri: url, method: 'POST'}}
            scalesPageToFit={false}
            onNavigationStateChange={this.onNavigationStateChange}
          />
        );
      case 'success':
        return (
          <Modal
            isVisible={true}
            animationType="slide"
            backdropOpacity={0.8}
            transparent={true}
            backdropColor="rgba(0,0,0,0.5)"
            useNativeDriver={true}
            hideModalContentWhileAnimating={true}
            style={{margin: 0, padding: 0, backgroundColor: 'white'}}>
            <OrderSuccess onPress={this.paymentSuccessDialogPress} />
          </Modal>
        );
      case 'failed':
        return (
          <Dialog
            title={I18n.t('payment_failed')}
            description={I18n.t('order_failed')}
            rightPress={this.paymentFailedDialogPress}
            visible={true}
          />
        );
      default:
        return null;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...ACTIONS, ...USER_ACTIONS, ...ORDER_ACTIONS},
      dispatch,
    ),
  };
}

function mapStateToProps(state) {
  return {
    cartItems: SELECTORS.getCartItems(state) || [],
    cart: SELECTORS.getCart(state),
    cartTotal: SELECTORS.getCartTotal(state),
    timings: ORDER_SELECTORS.getTimings(state) || [],
    isFetchingTimings: state.customer.timings.isFetching,
    user: USER_SELECTORS.getAuthUser(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    checkout: state.customer.checkout,
    areas: SELECTORS.getAreas(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Payment);
