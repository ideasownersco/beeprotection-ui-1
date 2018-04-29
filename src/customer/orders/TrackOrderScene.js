/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {RefreshControl, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import TrackItem from 'customer/orders/components/TrackItem';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';
import Map from 'components/Map';
import Touchable from 'react-native-platform-touchable';
import {ACTIONS as CUSTOMER_ACTIONS} from 'customer/common/actions';

class TrackOrderScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }),
      }),
    }),
  };

  componentDidMount() {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );
  }

  static defaultProps = {
    orderID: 0,
  };

  loadTrackDetailScene = () => {
    this.props.navigation.navigate('TrackDetail', {
      order: this.props.order,
    });
  };

  onRefresh = () => {
    this.props.dispatch(
      CUSTOMER_ACTIONS.fetchOrderDetails(
        this.props.navigation.state.params.orderID,
      ),
    );
  };

  render() {
    const {order, isFetching} = this.props;

    let {job, address} = order;
    let destination = {
      latitude: address.latitude,
      longitude: address.longitude,
    };

    let origin = {
      // latitude: 37.7882,
      // longitude: -122.43,
      latitude: 29.3772392006689,
      longitude: 47.98511826155676,
      heading: 0,
    };

    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps={'always'}
        contentInset={{bottom: 50}}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={this.onRefresh} />
        }
        refreshing={isFetching}>
        <View style={{backgroundColor: 'white'}}>
          <TrackItem
            title={I18n.t('order_received')}
            description={`${I18n.t('order_no')} : ${order.id}`}
            onPress={() => {}}
            iconProps={{
              type: 'Octicons',
              color: 'white',
              name: 'checklist',
            }}
            iconBackground={
              job.status == 'pending' ? colors.primary : colors.mediumGrey
            }
          />
          <TrackItem
            title={
              job.status == 'reached' ? I18n.t('reached') : I18n.t('on_our_way')
            }
            onPress={this.loadTrackDetailScene}
            iconProps={{
              type: 'MaterialCommunityIcons',
              color: 'white',
              name: 'car-estate',
            }}
            iconBackground={
              job.status == 'driving' || job.status == 'reached'
                ? colors.primary
                : colors.mediumGrey
            }
            description={
              order.trackeable ? (
                <Touchable
                  onPress={this.loadTrackDetailScene}
                  style={{height: 300}}>
                  <Map
                    origin={origin}
                    destination={destination}
                    cacheEnabled={true}
                  />
                </Touchable>
              ) : (
                I18n.t('tracking_not_available')
              )
            }
          />
          <TrackItem
            title={I18n.t('order_in_progress')}
            description={I18n.t('order_in_progress_description')}
            onPress={() => {}}
            iconProps={{
              type: 'MaterialCommunityIcons',
              color: 'white',
              name: 'clock',
            }}
            iconBackground={
              job.status == 'working' ? colors.primary : colors.mediumGrey
            }
          />
          <TrackItem
            title={I18n.t('all_done')}
            onPress={() => {}}
            iconProps={{
              type: 'MaterialCommunityIcons',
              color: 'white',
              name: 'flag',
            }}
            iconBackground={
              job.status == 'completed' ? colors.primary : colors.mediumGrey
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getOrderByID = ORDER_SELECTORS.getOrderByID();
  const mapStateToProps = (state, props) => {
    return {
      order: getOrderByID(state, props.navigation.state.params.orderID),
      isFetching: state.customer.order.isFetching,
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TrackOrderScene);
