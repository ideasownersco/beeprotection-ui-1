/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS, ACTIONS as ORDER_ACTIONS} from 'customer/common/actions';
import {ACTIONS as USER_ACTIONS} from 'guest/common/actions';
import {SELECTORS, SELECTORS as ORDER_SELECTORS,} from 'customer/selectors/orders';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import Button from 'components/Button';
import I18n from 'utils/locale';
import CartItems from 'customer/cart/components/CartItems';
import DatePicker from 'customer/cart/components/DatePicker';
import EmptyCart from 'customer/cart/components/EmptyCart';
import moment from 'moment-timezone';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import CartTotal from 'customer/cart/components/CartTotal';
import PaymentOptions from 'customer/cart/components/PaymentOptions';
import OrderSuccess from 'customer/cart/components/OrderSuccess';
import TimePicker from 'customer/cart/components/TimePicker';
import SectionTitle from 'components/SectionTitle';
import CheckoutAlert from 'customer/cart/components/CheckoutAlert';
import AddressesList from 'customer/cart/components/AddressesList';
import CreateAddress from 'customer/cart/components/CreateAddress';
import Modal from 'react-native-modal';
import AddressTypeSelectionModal from 'customer/cart/components/AddressTypeSelectionModal';
import CreateAddressFields from 'customer/cart/components/CreateAddressFields';
import GuestLoginAlert from "guest/GuestLoginAlert";
import Dialog from "../../components/Dialog";

class Cart extends PureComponent {
  state: State = {
    dates: [],
    showPaymentModal: false,
    showOrderSuccessModal: false,
    addressCreateModalVisible: false,
    addressCreateFieldsModalVisible: false,
    showCheckoutConfirmDialog: false,
    timePickerModalVisible: false,
    performingCheckout: false,
    addressTypeSelectionModalVisible: false,
    addressType: 'current_location',
    paymentMode: 'knet',
    address: {
      latitude: 29.3759,
      longitude: 47.9774,
    },
    savingAddress: false,
    showCheckoutLoginModal:false,
    showAddressLoginModal:false
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

    if (this.props.cart.isFreeWash) {
      this.setState({
        paymentMode: 'cash',
      });
    }
  }

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

  onDatePickerItemPress = date => {
    this.props.actions.setCartItems({
      selectedDate: date,
      selectedTimeID: null,
    });
    this.fetchTimings(date);
  };

  onTimeChange = (time:object) => {
    this.props.actions.setCartItem('selectedTimeID', time.id);
  };

  onPaymentOptionsItemPress = (option: string) => {
    this.setState({
      paymentMode: option,
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

  showAddressTypeSelectionModal = () => {
    let {isAuthenticated} = this.props;

    if (!isAuthenticated) {
      return this.redirectToAddressLogin();
    }

    this.setState({
      addressTypeSelectionModalVisible: true,
    });
  };

  hideAddressTypeSelectionModal = () => {
    this.setState({
      addressTypeSelectionModalVisible: false,
    });
  };

  onAddressesListItemPress = (item: object) => {
    this.props.actions.setCartItem('selectedAddressID', item.id);
  };

  showAddressCreateFieldsModal = () => {
    this.setState({
      addressCreateFieldsModalVisible: true,
    });
  };

  hideAddressCreateFieldsModal = () => {
    this.setState({
      addressCreateFieldsModalVisible: false,
    });
  };

  showAddressCreateModal = () => {
    this.setState({
      addressCreateModalVisible: true,
    });
  };

  hideAddressCreateModal = () => {
    this.setState({
      addressCreateModalVisible: false,
    });
  };

  onAddressTypeSelection = (type: string) => {
    this.setState({
      addressType: type,
    });

    this.hideAddressTypeSelectionModal();

    if (type === 'current_location') {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState(
            {
              address: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            },
            () => {
              this.showAddressCreateModal();
            },
          );
        },
        error => {},
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    } else {
      this.showAddressCreateModal();
    }
  };

  saveAddress = address => {
    this.setState({
      savingAddress: true,
    });

    return new Promise((resolve, reject) => {
      this.props.actions.saveAddress({address, resolve, reject});
    })
      .then(address => {
        this.setState(
          {
            address: {
              ...address,
            },
            savingAddress: false,
          },
          () => {
            this.showAddressCreateFieldsModal();
          },
        );
        this.hideAddressCreateModal();
      })
      .catch(e => {
        this.hideAddressCreateModal();
        this.setState({
          savingAddress: false,
        });
      });
  };

  updateAddress = address => {
    this.setState({
      savingAddress: false,
    });
    return new Promise((resolve, reject) => {
      this.props.actions.updateAddress({address, resolve, reject});
    })
      .then(address => {
        this.setState(
          {
            address: {
              ...address,
            },
            savingAddress: false,
          },
          () => {
            this.hideAddressCreateFieldsModal();
          },
        );

        this.hideAddressCreateModal();
      })
      .catch(e => {
        this.hideAddressCreateFieldsModal();
        this.setState({
          savingAddress: false,
        });
      });
  };

  deleteAddress = (address) => {
    this.props.actions.deleteAddress({
      address_id:address.id
    });
  };


  onSuccessButtonPress = () => {
    this.hideSuccessModal();
    this.fetchTimings();
    this.props.actions.flushCart();
    this.props.actions.fetchWorkingOrders({
      force: true,
    });
    this.props.navigation.popToTop();
    this.props.actions.setCartItem('isFreeWash', false);
  };

  fetchTimings = (date = null) => {
    let {isFreeWash} = this.props.cart;
    let orderDate = date ?  date : this.props.cart.selectedDate;
    this.props.actions.fetchTimings({
      date: orderDate.format('Y-M-D'),
      items: this.props.cart.items,
      free_wash: isFreeWash,
    });
  };

  redirectToLogin = () => {
    this.setState({
      showAddressLoginModal:true
    });
    // return Alert.alert(`${I18n.t('login_required')}`, '', [
    //   {text: I18n.t('cancel')},
    //   {
    //     text: I18n.t('login'),
    //     onPress: () =>
    //       this.props.navigation.navigate('Login', {
    //         redirectRoute: 'Cart',
    //       }),
    //   },
    // ]);
  };

  redirectToAddressLogin = () => {
    this.setState({
      showAddressLoginModal:true
    });
    // return Alert.alert(`${I18n.t('login_required')}`, '', [
    //   {text: I18n.t('cancel')},
    //   {
    //     text: I18n.t('login'),
    //     onPress: () =>
    //       this.props.navigation.navigate('Login', {
    //         redirectRoute: 'Cart',
    //       }),
    //   },
    // ]);
  };

  login = () => {
    this.hideLoginModal();
    this.props.navigation.navigate('Login', {
      redirectRoute: 'Cart',
    });
  };

  guestAddAddress = () => {
    this.hideLoginModal();
    this.showAddressCreateModal();
  };

  guestCheckout = () => {
    this.hideLoginModal();
  };

  hideLoginModal = () => {
    this.setState({
      showAddressLoginModal:false
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
      customer_name,
      customer_email,
      customer_mobile
    } = cart;

    if (!isAuthenticated) {
      this.hideCheckoutConfirmDialog();
      return this.redirectToLogin();
    } else {
      const item = {
        user_id: user.id,
        address_id: selectedAddressID,
        items: items,
        total: total,
        time: selectedTimeID,
        date: selectedDate.format('Y-M-D'),
        payment_mode: paymentMode,
        free_wash: cart.isFreeWash,
        customer_name:customer_name,
        customer_email:customer_email,
        customer_mobile:customer_mobile,
      };
      return new Promise((resolve, reject) => {
        this.props.actions.checkout({item, resolve, reject});
      })
        .then(order => {

          this.props.actions.setHasFreeWash({has_free_wash:false,force_fill:true});

          if (this.state.paymentMode === 'cash') {
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
          } else {
            this.setState({
              showPaymentModal: false,
              showCheckoutConfirmDialog: false,
            });

            return this.props.navigation.navigate('Payment', {
              orderID: order.id,
            });
          }
        })
        .catch(e => {
          this.hideCheckoutConfirmDialog();
        });
    }
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

    let {selectedDate, selectedAddressID, selectedTimeID, isFreeWash,deletedAddresses} = cart;

    let {
      dates,
      showOrderSuccessModal,
      addressCreateModalVisible,
      addressCreateFieldsModalVisible,
      paymentMode,
      showCheckoutConfirmDialog,
      addressTypeSelectionModalVisible,
      address,
      savingAddress,
      showAddressLoginModal,
      showCheckoutLoginModal
    } = this.state;

    if (!isFreeWash && !cartItems.length) {
      return <EmptyCart />;
    }

    return (
      <ScrollView
        contentInset={{bottom: 50}}
        style={[
          {backgroundColor: 'white'},
          checkout.isFetching && {opacity: 0.4},
        ]}>
        {!isFreeWash && (
          <View>
            <SectionTitle
              title={I18n.t('order_details')}
              style={{padding: 10}}
              icon="local-car-wash"
              iconType="MaterialIcons"
            />

            <CartItems items={cartItems} onItemPress={this.onCartItemPress} />

            <CartTotal total={cartTotal} />
          </View>
        )}

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
          deleteAddress={this.deleteAddress}
          deletedAddresses={deletedAddresses}
        />

        <Divider />

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Button
            onPress={this.showAddressTypeSelectionModal}
            color={colors.primary}
            icon={'add'}
            title={I18n.t('add_address')}
          />
        </View>

        {!this.props.cart.isFreeWash && (
          <View>
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
          </View>
        )}

        <Divider style={{marginVertical: 20}} />

        <Button
          onPress={this.showCheckoutConfirmDialog}
          disabled={checkout.isFetching}
          raised
          primary
          dark
          loading={checkout.isFetching}
          style={{
            justifyContent: 'center',
            marginTop: 20,
            backgroundColor: colors.primary,
          }}
          title={I18n.t('checkout')}
        />

        <CheckoutAlert
          disabled={checkout.isFetching}
          address={user && user.addresses && user.addresses[selectedAddressID]}
          total={cartTotal}
          date={selectedDate}
          time={
            (selectedTimeID &&
              timings.length &&
              timings.find(timing => timing.id === selectedTimeID)) ||
            null
          }
          visible={showCheckoutConfirmDialog}
          close={this.hideCheckoutConfirmDialog}
          checkout={this.performCheckout}
        />

        <AddressTypeSelectionModal
          visible={addressTypeSelectionModalVisible}
          close={this.hideAddressTypeSelectionModal}
          onPress={this.onAddressTypeSelection}
        />

        <Modal
          animationType="slide"
          isVisible={addressCreateModalVisible}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}
          presentationStyle="fullScreen"
          transparent={false}
          useNativeDriver={true}>
          <CreateAddress
            onCancel={this.hideAddressCreateModal}
            onSave={this.saveAddress}
            areas={areas}
            address={address}
            savingAddress={savingAddress}
          />
        </Modal>

        <Modal
          animationType="slide"
          isVisible={addressCreateFieldsModalVisible}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}
          presentationStyle="fullScreen"
          transparent={false}
          useNativeDriver={true}>
          <CreateAddressFields
            onCancel={this.hideAddressCreateFieldsModal}
            onSave={this.updateAddress}
            address={{...address}}
            savingAddress={savingAddress}
          />
        </Modal>

        <Modal
          isVisible={showOrderSuccessModal}
          animationType="slide"
          backdropOpacity={0.8}
          transparent={true}
          backdropColor="rgba(0,0,0,0.5)"
          useNativeDriver={true}
          hideModalContentWhileAnimating={true}
          style={{margin: 0, padding: 0, backgroundColor: 'white'}}>
          <OrderSuccess
            onPress={this.onSuccessButtonPress}
            visible={showOrderSuccessModal}
            onHide={this.hideSuccessModal}
            cart={cart}
            total={cartTotal}
          />
        </Modal>

        {/*<Modal*/}
        {/*isVisible={showLoginModal}*/}
        {/*transparent={true}*/}
        {/*useNativeDriver={true}*/}
        {/*hideModalContentWhileAnimating={true}*/}
        {/*style={{margin: 0, padding: 0, backgroundColor: 'white'}}*/}
        {/*>*/}
        {/*<GuestLoginAlert*/}
        {/*onPress={this.onSuccessButtonPress}*/}
        {/*visible={showOrderSuccessModal}*/}
        {/*onHide={this.hideLoginModal}*/}
        {/*cart={cart}*/}
        {/*total={cartTotal}*/}
        {/*/>*/}
        {/*</Modal>*/}

        <Dialog
          description={I18n.t('login_required')}
          rightButtonText={I18n.t('login')}
          rightButtonPress={this.login}
          leftButtonText={I18n.t('guest_add_address')}
          leftButtonPress={this.guestAddAddress}
          visible={showAddressLoginModal}
        />

        <Dialog
          description={I18n.t('login_required')}
          rightButtonText={I18n.t('login')}
          rightButtonPress={this.login}
          leftButtonText={I18n.t('guest_checkout')}
          leftButtonPress={this.guestCheckout}
          visible={showCheckoutLoginModal}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
