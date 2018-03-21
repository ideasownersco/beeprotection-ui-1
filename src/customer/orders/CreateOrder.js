/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS, ACTIONS as CART_ACTIONS} from 'customer/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {SELECTORS} from 'customer/selectors/orders';
import CategoriesList from 'customer/orders/components/CategoriesList';
import PackagesList from 'customer/orders/components/PackagesList';
import ServicesList from 'customer/orders/components/ServicesList';
import {Button} from 'react-native-paper';
import I18n from 'utils/locale';
import NavButton from 'components/NavButton';
import colors from 'assets/theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartSuccessModal from '../cart/components/CartSuccessModal';

type State = {
  activeCategoryID: ?number,
  activePackageID: ?number,
  activeServicesIDs: Array<string>,
  amount: number,
  showCartSuccessModal: boolean,
};

const initialState = {
  activeCategoryID: undefined,
  activePackageID: undefined,
  activeServicesIDs: [],
  amount: 0,
  showCartSuccessModal: false,
};

class CreateOrder extends PureComponent {
  state: State = initialState;

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <NavButton
          icon={
            <MaterialCommunityIcons
              name="cart-outline"
              size={30}
              color={colors.primary}
            />
          }
          onPress={() =>
            navigation.state.params &&
            navigation.state.params.handleRightButtonPress()
          }
        />
      ),
    };
  };

  componentDidMount() {
    this.props.actions.fetchCategories();
    this.props.actions.fetchTimings();
    this.props.navigation.setParams({
      handleRightButtonPress: this.loadCartScene,
    });
  }

  loadCartScene = () => {
    this.props.navigation.navigate('Cart');
  };

  componentDidUpdate() {
    const categories = this.props.categories;
    if (categories.length) {
      if (!this.props.cartReducer.activeCategoryID) {
        this.props.actions.setCartItem('activeCategoryID', categories[0].id);
      }
    }
  }

  onCategoriesListItemPress = (item: object) => {
    if (this.props.cartReducer.activeCategoryID !== item.id) {
      this.props.actions.setCartItems({
        activeCategoryID: item.id,
        activePackageID: undefined,
        activeServicesIDs: [],
      });
    }
  };

  onPackagesListItemPress = (item: object) => {
    let params = {
      activePackageID: item.id,
      total: parseInt(item.price),
    };

    if (this.props.cartReducer.activePackageID !== item.id) {
      params = {
        ...params,
        activeServicesIDs: [],
      };
    }

    this.props.actions.setCartItems(params);
  };

  onServicesListItemPress = (item: object) => {
    const {total, activeServicesIDs} = this.props.cartReducer;

    let currentAmount = parseInt(total) + parseInt(item.price);

    let index = activeServicesIDs.indexOf(item.id);

    let params = {
      activeServicesIDs:
        index > -1
          ? activeServicesIDs.filter(serviceID => serviceID !== item.id)
          : activeServicesIDs.concat(item.id),
      total: currentAmount,
    };

    this.props.actions.setCartItems(params);
  };

  onAddToCartPress = () => {
    const {
      activeCategoryID,
      activePackageID,
      activeServicesIDs,
      total,
    } = this.props.cartReducer;

    const item = {
      category: activeCategoryID,
      package: activePackageID,
      services: activeServicesIDs,
      total: total,
    };

    this.props.actions.setCartItems({
      activeCategoryID: undefined,
      activePackageID: undefined,
      activeServicesIDs: [],
    });

    // return new Promise((resolve, reject) => {
    this.props.actions.addToCart(item);

    // dispatch order success
    this.setState({
      showCartSuccessModal: true,
    });
  };

  onAddNewItemPress = () => {
    this.setState({
      showCartSuccessModal: false,
    });
  };

  onCheckoutPress = () => {
    this.setState({
      showCartSuccessModal: false,
    });
    this.props.navigation.navigate('Cart');
  };

  hideCheckoutModal = () => {
    this.setState({
      showCartSuccessModal: false,
    });
  };

  render() {
    const {
      activeCategoryID,
      activePackageID,
      activeServicesIDs,
    } = this.props.cartReducer;
    const {categories} = this.props;

    const {showCartSuccessModal} = this.state;

    let activeCategory = activeCategoryID
      ? categories.find(item => item.id === activeCategoryID)
      : categories.length
        ? categories[0]
        : {
            id: undefined,
            packages: [],
          };

    return (
      <ScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        keyboardShouldPersistTaps={'always'}
        contentInset={{bottom: 50}}>
        <CategoriesList
          items={categories}
          onItemPress={this.onCategoriesListItemPress}
          activeItemID={activeCategoryID}
        />

        {activeCategory.packages &&
          activeCategory.packages.length && (
            <PackagesList
              items={activeCategory.packages}
              onItemPress={this.onPackagesListItemPress}
              activeItemID={activePackageID}
            />
          )}

        {activePackageID && (
          <ServicesList
            items={
              activeCategory.packages.find(item => item.id === activePackageID)
                .services
            }
            onItemPress={this.onServicesListItemPress}
            activeItemIDs={activeServicesIDs}
          />
        )}

        <Button
          onPress={this.onAddToCartPress}
          disabled={!activePackageID}
          raised
          primary>
          {I18n.t('add_to_cart')}
        </Button>

        <CartSuccessModal
          onAddNewItemPress={this.onAddNewItemPress}
          onCheckoutPress={this.onCheckoutPress}
          visible={showCartSuccessModal}
          onHide={this.hideCheckoutModal}
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
    cartReducer: SELECTORS.getCart(state),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrder);
