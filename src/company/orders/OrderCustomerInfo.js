/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS, ACTIONS as CART_ACTIONS} from 'customer/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {SELECTORS} from 'customer/selectors/orders';
import FormTextInput from "components/FormTextInput";
import FormSubmit from "components/FormSubmit";
import I18n from 'utils/locale';

class OrderCustomerInfo extends PureComponent {

  createOrder = () => {
    this.props.navigation.navigate('CreateOrder');
  };

  onFieldChange = (key,value) => {
    this.props.actions.setCartItem(key,value);
  };

  render() {

    let {customer_name,customer_mobile,customer_email} = this.props.cart;

    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white',padding:10}}
        keyboardShouldPersistTaps={'always'}
        contentInset={{bottom: 50}}>

            <FormTextInput
              onValueChange={this.onFieldChange}
              value={customer_name}
              field="customer_name"
              maxLength={40}
              label={I18n.t('name')}
            />

            <FormTextInput
              onValueChange={this.onFieldChange}
              value={customer_email}
              field="customer_email"
              maxLength={40}
              label={I18n.t('email')}
              keyboardType="email-address"
            />

            <FormTextInput
              onValueChange={this.onFieldChange}
              value={customer_mobile}
              field="customer_mobile"
              maxLength={40}
              label={I18n.t('mobile')}
              keyboardType="phone-pad"
            />

        <FormSubmit
          onPress={this.createOrder}
          title={I18n.t('create_order')}
          style={{marginVertical: 20}}
        />

      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {...ACTIONS, ...CART_ACTIONS, ...APP_ACTIONS},
      dispatch,
    ),
  };
}

function mapStateToProps(state) {
  return {
    categories: SELECTORS.getCategories(state),
    cart: SELECTORS.getCart(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderCustomerInfo);
