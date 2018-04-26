/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
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
import EmptyCart from 'customer/cart/components/EmptyCart';
import moment from 'moment';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import CartTotal from 'customer/cart/components/CartTotal';
import PaymentOptions from 'customer/cart/components/PaymentOptions';
import OrderSuccess from 'customer/cart/components/OrderSuccess';
import PaymentPage from 'customer/cart/components/PaymentPage';
import TimePicker from './components/TimePicker';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import SectionTitle from 'components/SectionTitle';
import CheckoutAlert from 'customer/cart/components/CheckoutAlert';
import AddressesList from 'customer/cart/components/AddressesList';
import CreateAddress from 'customer/cart/components/CreateAddress';
import IconFactory from 'components/IconFactory';
import Modal from 'react-native-modal';

type State = {
  dates: Array,
  paymentMode: 'knet' | 'cash',
  showPaymentModal: boolean,
  showOrderSuccessModal: boolean,
  timePickerModalVisible: boolean,
};

class Cart extends PureComponent {
  state: State = {
    dates: [],
    showPaymentModal: false,
    showOrderSuccessModal: false,
    showAddressCreateModal: false,
    showCheckoutConfirmDialog: false,
    timePickerModalVisible: false,
    performingCheckout: false,
    paymentMode: 'cash',
  };

  static defaultProps = {
    user: {
      addresses: [],
    },
    areas: [],
    timings: [],
    cartItems: [],
    cart: {},
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
    this.props.actions.fetchAreas();
    this.fetchTimings();
  }

  checkout = () => {
    this.showCheckoutConfirmDialog();
  };

  showCheckoutConfirmDialog = () => {
    this.setState({
      showCheckoutConfirmDialog: true,
    });
  };

  hideCheckoutConfirmDialog = () => {
    this.setState({
      showCheckoutConfirmDialog: false,
    });
  };

  performCheckout = () => {
    const {user, isAuthenticated, cart} = this.props;
    const {paymentMode} = this.state;

    const {
      selectedDate,
      selectedAddressID,
      selectedTimeID,
      items,
      total,
    } = cart;
    if (!isAuthenticated) {
      this.props.navigation.navigate('Login', {
        redirectRoute: 'Cart',
      });
    } else {
      const item = {
        user_id: user.id,
        address_id: selectedAddressID,
        items: items,
        total: total,
        time: selectedTimeID,
        date: selectedDate,
        payment_mode: paymentMode,
      };

      let address =
        user &&
        user.addresses.find(address => address.id === selectedAddressID);

      if (!address.area.active) {
        return this.props.dispatch(
          APP_ACTIONS.setNotification({
            type: 'error',
            message: `${I18n.t('address_disabled')}`,
          }),
        );
      }

      return new Promise((resolve, reject) => {
        this.props.actions.checkout({item, resolve, reject});
      })
        .then(order => {
          if (order.status == 'Success') {
            this.setState({
              showOrderSuccessModal: true,
              showCheckoutConfirmDialog: false,
            });
          } else if (order.status == 'Checkout') {
            this.setState({
              showPaymentModal: true,
              showCheckoutConfirmDialog: false,
            });
          }
        })
        .catch(e => {
          this.setState({
            showCheckoutConfirmDialog: false,
          });
        });
    }
  };

  onDatePickerItemPress = date => {
    this.props.actions.setCartItems({
      selectedDate: date,
      selectedTimeID: null,
    });
    this.fetchTimings(date);
  };

  onTimeChange = time => {
    // this.props.actions.setCartItem('selectedTime', moment(time));
    this.props.actions.setCartItem('selectedTimeID', time.id);
  };

  onPaymentOptionsItemPress = (option: string) => {
    this.setState({
      paymentMode: option,
    });
  };

  onAddressesListItemPress = (item: object) => {
    this.props.actions.setCartItem('selectedAddressID', item.id);
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

  onCartItemPress = (item: object) => {
    return Alert.alert(`${I18n.t('cart_remove_item')} ?`, '', [
      {text: I18n.t('cancel')},
      {
        text: I18n.t('yes'),
        onPress: () => this.props.actions.removeCartItem(item.id),
      },
    ]);
  };

  saveAddress = address => {
    this.props.actions.saveAddress(address);
    this.hideAddressCreateModal();
  };

  onSuccessButtonPress = () => {
    this.hideSuccessModal();
    this.fetchTimings();
    this.props.actions.flushCart();
    this.props.actions.fetchWorkingOrder();
    this.props.navigation.popToTop();
  };

  fetchTimings = (date = null) => {
    this.props.actions.fetchTimings({
      date: date ? date : this.props.cart.selectedDate,
      items: this.props.cart.items,
    });
  };

  showAddressCreateModal = () => {
    let {isAuthenticated} = this.props;

    if (!isAuthenticated) {
      return this.redirectToLogin();
    }

    this.setState({
      showAddressCreateModal: true,
    });
  };

  hideAddressCreateModal = () => {
    this.setState({
      showAddressCreateModal: false,
    });
  };

  redirectToLogin = () => {
    return Alert.alert(`${I18n.t('login_required')}`, '', [
      {text: I18n.t('cancel')},
      {
        text: I18n.t('login'),
        onPress: () =>
          this.props.navigation.navigate('Login', {
            redirectRoute: 'Cart',
          }),
      },
    ]);
  };

  render() {
    let {
      cart,
      cartItems,
      user,
      cartTotal,
      checkout,
      timings,
      isFetchingTimings,
      areas,
    } = this.props;
    let {selectedDate, selectedAddressID, selectedTimeID} = cart;

    let {
      dates,
      showPaymentModal,
      showOrderSuccessModal,
      showAddressCreateModal,
      paymentMode,
      showCheckoutConfirmDialog,
    } = this.state;

    if (!cartItems.length) {
      return <EmptyCart />;
    }

    return (
      <ScrollView
        contentInset={{bottom: 50}}
        style={[
          {backgroundColor: 'white'},
          checkout.isFetching && {opacity: 0.4},
        ]}>
        <SectionTitle
          title={I18n.t('order_details')}
          style={{padding: 10}}
          icon="local-car-wash"
          iconType="MaterialIcons"
        />

        <CartItems items={cartItems} onItemPress={this.onCartItemPress} />

        <CartTotal total={cartTotal} />

        <SectionTitle
          title={I18n.t('date')}
          style={{padding: 10, marginTop: 10}}
          icon="calendar"
          iconType="MaterialCommunityIcons"
        />

        <DatePicker
          items={dates || []}
          onItemPress={this.onDatePickerItemPress}
          activeItem={selectedDate}
        />

        <SectionTitle
          title={I18n.t('time')}
          style={{padding: 10, marginTop: 10}}
          icon="clock-fast"
          iconType="MaterialCommunityIcons"
          iconSize={33}
        />

        <TimePicker
          items={timings || []}
          onItemPress={this.onTimeChange}
          activeItemID={selectedTimeID}
          isFetching={isFetchingTimings}
        />

        <Divider
          style={{
            flex: 1,
            marginTop: 20,
            padding: 10,
            backgroundColor: colors.lightGrey,
          }}
        />

        <SectionTitle
          title={I18n.t('address')}
          style={{padding: 10}}
          icon="location-pin"
          iconType="Entypo"
          iconSize={28}
        />

        <AddressesList
          items={user ? (user.addresses ? user.addresses : []) : []}
          onItemPress={this.onAddressesListItemPress}
          activeItemID={selectedAddressID || null}
        />

        <Modal
          animationType="slide"
          isVisible={showAddressCreateModal}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}
          presentationStyle="fullScreen"
          transparent={false}>
          <CreateAddress
            onCancel={this.hideAddressCreateModal}
            onSave={this.saveAddress}
            areas={areas}
          />
        </Modal>

        <Button
          onPress={this.showAddressCreateModal}
          color={colors.primary}
          // style={{alignItems: 'flex-start'}}
        >
          <View
            style={{
              flex:1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconFactory
              type="MaterialIcons"
              name="add"
              size={22}
              color={colors.primary}
            />
            <Text
              style={{color: colors.darkGrey, fontSize: 18, fontWeight: '700'}}>
              {I18n.t('add_address')}
            </Text>
          </View>
        </Button>

        <Divider
          style={{flex: 1, padding: 10, backgroundColor: colors.lightGrey}}
        />

        <SectionTitle
          title={I18n.t('payment_mode')}
          style={{padding: 10, marginTop: 10}}
          icon="cash"
          iconType="MaterialCommunityIcons"
        />

        <PaymentOptions
          onPress={this.onPaymentOptionsItemPress}
          selectedItem={paymentMode}
        />

        <Divider style={{marginVertical: 20}} />

        <Button
          onPress={this.checkout}
          disabled={checkout.isFetching}
          raised
          primary
          dark
          loading={checkout.isFetching}
          style={{
            justifyContent: 'center',
            paddingVertical: 10,
            marginTop: 20,
            backgroundColor: colors.primary,
          }}>
          {I18n.t('checkout')}
        </Button>

        <OrderSuccess
          onPress={this.onSuccessButtonPress}
          visible={showOrderSuccessModal}
          onHide={this.hideSuccessModal}
          cart={cart}
          total={cartTotal}
        />

        <PaymentPage
          onPress={this.onPaymentOptionsItemPress}
          visible={showPaymentModal}
          onHide={this.hideCheckoutModal}
        />

        <CheckoutAlert
          disabled={checkout.isFetching}
          address={user && user.addresses && user.addresses[selectedAddressID]}
          total={cartTotal}
          date={selectedDate}
          time={selectedTimeID && timings.length && timings[selectedTimeID] || null}
          visible={showCheckoutConfirmDialog}
          close={this.hideCheckoutConfirmDialog}
          checkout={this.performCheckout}
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
    isFetchingTimings: state.customer.timings.isFetching,
    user: USER_SELECTORS.getAuthUser(state),
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
    checkout: state.customer.checkout,
    areas: SELECTORS.getAreas(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
