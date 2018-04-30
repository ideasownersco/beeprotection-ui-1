/**
 * @flow
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import DriverInfo from 'company/drivers/components/DriverInfo';
import DriverThumb from 'company/drivers/components/DriverThumb';
import SectionHeading from 'company/components/SectionHeading';
import OrdersList from 'company/orders/components/OrdersList';
import {ACTIONS as COMPANY_ACTIONS} from 'company/common/actions';
import {SELECTORS as DRIVER_SELECTORS} from 'company/selectors/drivers';

import I18n from 'utils/locale';
import {Switch} from 'react-native-paper';
import DriverStartEndTime from 'company/drivers/components/DriverStartEndTime';
import {SELECTORS as ORDER_SELECTORS} from 'company/selectors/orders';
import Divider from 'components/Divider';
import Modal from 'react-native-modal';
import DriverTimePicker from 'company/drivers/components/DriverTimePicker';
import Button from 'components/Button';
import colors from 'assets/theme/colors';

class DriverDetailScene extends PureComponent {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          driverID: PropTypes.number.isRequired,
        }),
      }),
    }),
    driver: PropTypes.object.isRequired,
  };

  static defaultProps = {
    navigation: {state: {params: {driverID: 0}}},
    driver: {user: {}},
    timings: [],
  };

  state = {
    online: true,
    showStartEndTimeModal: false,
    start_time_id: null,
    end_time_id: null,
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Switch
          style={{transform: [{scaleX: 0.8}, {scaleY: 0.8}]}}
          value={navigation.state.params && navigation.state.params.online}
          onValueChange={value =>
            navigation.state.params &&
            navigation.state.params.handleRightButtonPress(value)
          }
          color={colors.success}
        />
      ),
    };
  };

  componentDidMount() {
    this.props.dispatch(
      COMPANY_ACTIONS.fetchDriver(this.props.navigation.state.params.driverID),
    );
    this.props.navigation.setParams({
      handleRightButtonPress: this.activateDriver,
      online: this.state.online,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let {driver, timings} = nextProps;

    let startTime = timings.find(timing => timing.name === driver.start_time);
    let endTime = timings.find(timing => timing.name === driver.end_time);
    return {
      online: driver.online,
      start_time_id: startTime ? startTime.id : null,
      end_time_id: endTime ? endTime.id : null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.online !== this.state.online) {
      this.props.navigation.setParams({
        online: this.state.online,
      });
    }
  }

  activateDriver = (status: boolean) => {
    this.setState({
      online: !this.state.online,
    });

    this.props.dispatch(
      COMPANY_ACTIONS.saveDriverAttributes({
        driver_id: this.props.driver.id,
        status: status,
      }),
    );
  };

  onOrdersListItemPress = (item: object) => {
    this.props.navigation.navigate('OrderDetail', {
      orderID: item.id,
    });
  };

  showStartEndTimeModal = () => {
    this.setState({
      showStartEndTimeModal: true,
    });
  };

  hideStartEndTimeModal = () => {
    this.setState({
      showStartEndTimeModal: false,
    });
  };

  onDriverStartTimePress = item => {
    this.setState({
      start_time_id: item.id,
    });
  };

  onDriverEndTimePress = item => {
    this.setState({
      end_time_id: item.id,
    });
  };

  setTimings = () => {
    this.hideStartEndTimeModal();

    this.props.dispatch(
      COMPANY_ACTIONS.saveDriverAttributes({
        driver_id: this.props.driver.id,
        start_time_id: this.state.start_time_id,
        end_time_id: this.state.end_time_id,
      }),
    );
  };

  render() {
    const {driver, timings} = this.props;

    const {image, name} = driver.user;
    return (
      <ScrollView
        style={{flex: 1}}
        keyboardShouldPersistTap="always"
        contentContainerStyle={{paddingBottom: 100}}>
        <DriverThumb image={image} name={name} />

        <DriverInfo driver={driver} />

        <Divider />

        <DriverStartEndTime
          onPress={this.showStartEndTimeModal}
          driver={driver}
        />

        {driver.working_order &&
          driver.working_order.id && (
            <View>
              <SectionHeading
                title={I18n.t('working_order')}
                onButtonPress={this.loadCurrentOrders}
              />

              <OrdersList
                items={[driver.working_order]}
                onItemPress={this.onOrdersListItemPress}
              />
            </View>
          )}

        {driver.upcoming_orders &&
          driver.upcoming_orders.length && (
            <View>
              <SectionHeading
                title={I18n.t('upcoming_orders')}
                onButtonPress={this.loadCurrentOrders}
              />

              <OrdersList
                items={driver.upcoming_orders}
                onItemPress={this.onOrdersListItemPress}
              />
            </View>
          )}

        <Modal
          isVisible={this.state.showStartEndTimeModal}
          onBackdropPress={this.hideStartEndTimeModal}
          style={{flex: 1, backgroundColor: 'white', padding: 0}}>
          <DriverTimePicker
            timings={timings}
            onStartTimePress={this.onDriverStartTimePress}
            onEndTimePress={this.onDriverEndTimePress}
            start_time_id={this.state.start_time_id}
            end_time_id={this.state.end_time_id}
          />

          <Button
            title={I18n.t('save')}
            style={{marginTop: 20}}
            onPress={this.setTimings}
          />
        </Modal>
      </ScrollView>
    );
  }
}

const makeMapStateToProps = () => {
  const getDriverByID = DRIVER_SELECTORS.getDriverByID();
  const mapStateToProps = (state, props) => {
    return {
      driver: getDriverByID(state, props.navigation.state.params.driverID),
      timings: ORDER_SELECTORS.getTimings(state) || [],
    };
  };
  return mapStateToProps;
};

export default connect(makeMapStateToProps)(DriverDetailScene);
