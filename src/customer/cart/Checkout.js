/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import colors from 'assets/theme/colors';
import Button from 'components/Button';
import I18n from 'utils/locale';
import {SELECTORS as CUSTOMER_SELECTORS} from 'customer/common/selectors';
import {ACTIONS} from 'customer/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import Dialog from 'components/Dialog';
import FormTextInput from 'components/FormTextInput';
import PropTypes from 'prop-types';

type State = {
  loginDialogVisible: boolean,
};

class Checkout extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state: State = {
    loginDialogVisible: false,
    name: null,
    email: null,
    mobile: null,
  };

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   let {order} = nextProps;
  //   return {
  //     name: order.name,
  //     email: order.email,
  //     mobile: order.mobile,
  //   };
  // }
  //
  static defaultProps = {
    order: {},
  };

  componentDidMount() {
    this.props.dispatch(
      ACTIONS.fetchOrderDetails({
        order_id: this.props.navigation.getParam('orderID'),
      }),
    );
  }

  onCheckoutPress = () => {
    let {order} = this.props;

    let attributes = {
      ...this.state,
    };

    new Promise((resolve, reject) => {
      this.props.dispatch(
        ACTIONS.checkout({order_id: order.id, attributes, resolve, reject}),
      );
    })
      .then(res => {
        return this.props.navigation.navigate('Payment', {
          orderID: res.id,
        });
      })
      .catch(e => {
      });
  };

  onFieldChange = (field, value) => {
    this.setState({[field]: value});
  };

  render() {
    let {name, email, mobile} = this.state;

    return (
      <ScrollView
        style={{padding: 10, backgroundColor: colors.lightGrey}}
        contentInset={{bottom: 50}}>
        <FormTextInput
          onValueChange={this.onFieldChange}
          value={name}
          field="name"
          maxLength={40}
          label={I18n.t('name')}
        />

        <FormTextInput
          onValueChange={this.onFieldChange}
          value={email}
          field="email"
          maxLength={40}
          label={I18n.t('email')}
          keyboardType="email-address"
        />

        <FormTextInput
          onValueChange={this.onFieldChange}
          value={mobile}
          field="mobile"
          maxLength={40}
          label={I18n.t('mobile')}
          keyboardType="phone-pad"
        />

        <Button
          primary
          raised
          dark
          title={I18n.t('payment_proceed').toUpperCase()}
          onPress={this.onCheckoutPress}
          style={{marginTop: 20}}
        />
      </ScrollView>
    );
  }
}

function mapStateToProps(state, props) {
  const orderID = props.navigation.getParam('orderID');
  const getOrderByID = CUSTOMER_SELECTORS.getOrderByID();

  return {
    user: USER_SELECTORS.getAuthUser(state),
    order: getOrderByID(state, orderID),
  };
}

export default connect(mapStateToProps)(Checkout);
