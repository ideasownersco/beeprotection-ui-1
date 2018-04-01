/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {SELECTORS as ORDER_SELECTORS} from 'customer/selectors/orders';
import TrackItem from 'customer/orders/components/TrackItem';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';
import colors from 'assets/theme/colors';
import {ACTIONS as ORDER_ACTIONS} from 'company/common/actions';

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

  static defaultProps = {
    orderID: 0,
  };

  loadTrackDetailScene = () => {
    this.props.navigation.navigate('TrackDetail', {
      order: this.props.order,
    });
  };

  render() {
    const {order} = this.props;
    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTaps={'always'}
        contentInset={{bottom: 50}}>
        <View style={{backgroundColor: 'white'}}>
          <TrackItem
            title={I18n.t('order_submitted')}
            description="no : 221133"
            onPress={() => {}}
            icon={
              <IconFactory
                type="Octicons"
                name="checklist"
                size={30}
                color={colors.white}
              />
            }
          />
          <TrackItem
            title={I18n.t('order_in_progress')}
            description={I18n.t('order_in_progress_description')}
            onPress={() => {}}
            icon={
              <IconFactory
                type="MaterialCommunityIcons"
                name="clock"
                size={33}
                color={colors.white}
              />
            }
          />
          <TrackItem
            title={I18n.t('on_our_way')}
            onPress={this.loadTrackDetailScene}
            icon={
              <IconFactory
                type="MaterialCommunityIcons"
                name="car-estate"
                size={30}
                color={colors.white}
              />
            }
          />
          <TrackItem
            title={I18n.t('all_done')}
            onPress={() => {}}
            icon={
              <IconFactory
                type="MaterialCommunityIcons"
                name="flag"
                size={30}
                color={colors.white}
              />
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
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(TrackOrderScene);
