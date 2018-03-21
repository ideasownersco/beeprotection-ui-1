/**
 * @flow
 */
import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS, ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {
  SELECTORS,
  SELECTORS as ORDER_SELECTORS,
} from 'customer/selectors/orders';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import {Button} from 'react-native-paper';
import I18n from 'utils/locale';
import CartItems from 'customer/cart/components/CartItems';
import DatePicker from 'customer/cart/components/DatePicker';
import TimePicker from 'customer/cart/components/TimePicker';
import AddressPicker from 'customer/cart/components/AddressPicker';
import EmptyCart from 'customer/cart/components/EmptyCart';
import moment from 'moment';
import Separator from 'components/Separator';
import colors from 'assets/theme/colors';
import SectionHeading from 'company/components/SectionHeading';
import CartTotal from 'customer/cart/components/CartTotal';
import PaymentOptions from 'customer/cart/components/PaymentOptions';
import OrderSuccess from 'customer/cart/components/OrderSuccess';
import PaymentPage from 'customer/cart/components/PaymentPage';

type State = {
  dates: Array,
  paymentMode: 'knet' | 'cash',
  showPaymentModal: boolean,
  showOrderSuccessModal: boolean,
};

class Cart extends Component {
  state: State = {
    dates: [],
    showPaymentModal: false,
    showOrderSuccessModal: false,
    paymentMode: 'knet',
  };

  componentDidMount() {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      dates.push(moment().add(i, 'days'));
    }
    this.setState({
      dates: dates,
    });
    this.props.actions.fetchCartItems();
    this.props.actions.fetchAddresses();
  }

  performCheckout = () => {
    const {user, isAuthenticated, cart} = this.props;
    const {paymentMode} = this.state;

    const {selectedDate, selectedTime, selectedAddressID} = cart;
    if (!isAuthenticated) {
      this.props.navigation.navigate('Login');
    } else {
      const item = {
        user_id: user.id,
        address_id: selectedAddressID,
        items: this.props.cart.items,
        total: this.props.cart.total,
        time: selectedTime,
        date: selectedDate,
        payment_mode: paymentMode,
      };

      return new Promise((resolve, reject) => {
        this.props.actions.checkout({item, resolve, reject});
        // this.props.dispatch(CUSTOMER_ACTIONS.saveLoad({params, resolve}));
        // dispatch(someActionCreator({ values, resolve, reject }))
      })
        .then(order => {
          if (order.status == 'Success') {
            this.setState({
              showOrderSuccessModal: true,
            });
          } else if (order.status == 'Checkout') {
            this.setState({
              showPaymentModal: true,
            });
          }

          console.log('order success');
        })
        .catch(e => {
          console.log('e');
        });

      // NavigatorService.reset('Home');
    }
  };

  onDatePickerItemPress = (item: object) => {
    this.props.actions.setCartItem('selectedDate', item);
  };

  onTimePickerItemPress = time => {
    console.log('time', time);
    this.props.actions.setCartItem('selectedTime', time);
  };

  onPaymentOptionsItemPress = (option: string) => {
    console.log('onPyamentPress', option);
    this.setState({
      paymentMode: option,
    });
  };

  onAddressPickerItemPress = (item: object) => {
    this.props.actions.setCartItem('selectedAddressID', item.id);
  };

  saveAddress = address => {
    const {isAuthenticated} = this.props;
    if (!isAuthenticated) {
      this.props.navigation.navigate('Login');
    } else {
      this.props.actions.saveAddress(address);
    }
  };

  addNewCar = () => {
    this.props.navigation.goBack(null);
  };

  hideCheckoutModal = () => {
    this.setState({
      showPaymentModal: false,
    });
  };

  hideSuccessModal = () => {
    this.setState({
      showOrderSuccessModal: false,
    });
  };

  render() {
    let {cart, cartItems, user, cartTotal, checkout} = this.props;
    let {selectedDate, selectedTime, selectedAddressID} = cart;
    console.log('selectedTime in Cart', selectedTime);
    let {
      dates,
      showPaymentModal,
      showOrderSuccessModal,
      paymentMode,
    } = this.state;

    if (!cartItems.length) {
      return <EmptyCart />;
    }

    return (
      <ScrollView contentInset={{bottom: 50}}>
        <CartItems items={cartItems} onItemPress={() => {}} />

        <CartTotal total={cartTotal} />

        <Separator style={{marginVertical: 10}} />

        <DatePicker
          items={dates}
          onItemPress={this.onDatePickerItemPress}
          activeItem={selectedDate}
        />

        <Separator style={{marginVertical: 10}} />

        <SectionHeading
          title={I18n.t('select_time')}
          style={{backgroundColor: 'transparent'}}
        />

        <TimePicker
          mode="time"
          date={selectedTime}
          placeholder={I18n.t('select')}
          confirmBtnText={I18n.t('confirm')}
          cancelBtnText={I18n.t('cancel')}
          onDateChange={this.onTimePickerItemPress}
          customStyles={{
            dateTouchBody: {
              padding: 10,
              backgroundColor: 'white',
            },
            dateText: {
              color: colors.primary,
              fontWeight: '500',
              fontSize: 25,
            },
          }}
        />

        <Separator style={{marginVertical: 10}} />

        <AddressPicker
          addresses={user ? (user.addresses ? user.addresses : []) : []}
          saveAddress={this.saveAddress}
          onAddressPickerItemPress={this.onAddressPickerItemPress}
          activeItemID={selectedAddressID}
        />

        <Separator style={{marginVertical: 10}} />

        <SectionHeading
          title={I18n.t('payment_mode')}
          style={{backgroundColor: 'transparent'}}
        />

        <PaymentOptions
          onPress={this.onPaymentOptionsItemPress}
          selectedItem={paymentMode}
        />

        {/*<Button*/}
        {/*title={I18n.t('checkout')}*/}
        {/*onPress={this.performCheckout}*/}
        {/*style={{marginTop: 10}}*/}
        {/*background="success"*/}
        {/*disabled={checkout.isFetching}*/}
        {/*/>*/}

        <Button
          onPress={this.performCheckout}
          disabled={checkout.isFetching}
          raised
          primary
          loading={checkout.isFetching}
          style={{
            justifyContent: 'center',
            paddingVertical: 10,
            marginTop: 20,
          }}>
          {I18n.t('checkout')}
        </Button>

        {/*<Button*/}
        {/*title={I18n.t('add_new_car')}*/}
        {/*onPress={this.addNewCar}*/}
        {/*style={{marginTop: 30}}*/}
        {/*background="secondary"*/}
        {/*/>*/}

        <OrderSuccess
          onPress={this.onPaymentOptionsItemPress}
          visible={showOrderSuccessModal}
          onHide={this.hideSuccessModal}
        />

        <PaymentPage
          onPress={this.onPaymentOptionsItemPress}
          visible={showPaymentModal}
          onHide={this.hideCheckoutModal}
        />
      </ScrollView>
    );
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
    user: USER_SELECTORS.getAuthUser(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    checkout: state.customer.checkout,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
