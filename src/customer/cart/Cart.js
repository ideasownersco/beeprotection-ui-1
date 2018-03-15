/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS, ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {
  SELECTORS,
  SELECTORS as ORDER_SELECTORS,
} from 'customer/selectors/orders';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import Button from 'components/Button';
import I18n from 'utils/locale';
import CartItems from 'customer/cart/components/CartItems';
import DatePicker from 'customer/cart/components/DatePicker';
import TimePicker from 'customer/cart/components/TimePicker';
import AddressPicker from 'customer/cart/components/AddressPicker';
import EmptyCart from 'customer/cart/components/EmptyCart';
import moment from 'moment';
import Separator from 'components/Separator';
import NavigatorService from 'components/NavigatorService';
import colors from '../../assets/theme/colors';
import SectionHeading from '../../company/components/SectionHeading';

type State = {
  dates: Array,
};

class Cart extends PureComponent {
  state: State = {
    dates: [],
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
      };

      this.props.actions.saveOrder(item);

      NavigatorService.reset('Home');
    }
  };

  onDatePickerItemPress = (item: object) => {
    this.props.actions.setCartItem('selectedDate', item);
  };

  onTimePickerItemPress = time => {
    console.log('time', time);
    this.props.actions.setCartItem('selectedTime', time);
  };

  onPaymentOptionsItemPress = () => {};

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

  render() {
    let {cart, timings, cartItems, user} = this.props;

    let {selectedDate, selectedTime, selectedAddressID} = cart;
    let {dates} = this.state;

    return cartItems.length ? (
      <ScrollView contentInset={{bottom: 50}}>

        <CartItems items={cartItems} onItemPress={() => {}} />

        <Separator style={{marginVertical: 10}} />

        <DatePicker
          items={dates}
          onItemPress={this.onDatePickerItemPress}
          activeItem={selectedDate}
        />

        <Separator style={{marginVertical: 10}} />

        {/*<TimePicker*/}
        {/*items={timings}*/}
        {/*onItemPress={this.onTimePickerItemPress}*/}
        {/*activeItemID={selectedTime}*/}
        {/*/>*/}

        <SectionHeading title={I18n.t('select_time')} style={{backgroundColor:'transparent'}} />
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
              backgroundColor:'white'
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

        {/*<PaymentOptions onItemPress={this.onPaymentOptionsItemPress} />*/}

        <Button
          title={I18n.t('checkout')}
          onPress={this.performCheckout}
          style={{marginTop: 10}}
          background="success"
        />

        <Button
          title={I18n.t('add_new_car')}
          onPress={this.addNewCar}
          style={{marginTop: 30}}
          background="secondary"
        />
      </ScrollView>
    ) : (
      <EmptyCart />
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
    timings: ORDER_SELECTORS.getTimings(state) || [],
    user: USER_SELECTORS.getAuthUser(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
