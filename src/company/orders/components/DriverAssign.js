import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text, Modal} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
import Button from 'components/Button';
import I18n from 'utils/locale';
import DriversList from 'driver/components/DriversList';
import SectionTitle from 'components/SectionTitle';

export default class DriverAssign extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.order !== this.props.order ||
      nextState.showModal !== this.state.showModal
    );
  }

  state = {
    showModal: false,
  };

  static propTypes = {
    order: PropTypes.object.isRequired,
    drivers: PropTypes.array.isRequired,
    onDriversListItemPress: PropTypes.func.isRequired,
  };

  showModal = (value: boolean) => {
    this.setState({
      showModal: value,
    });
  };

  selectDriver = driver => {
    console.log('select driver');
    this.showModal(false);
    this.props.onDriversListItemPress(driver);
  };

  render() {
    const {order, drivers, onDriversListItemPress} = this.props;
    const {showModal} = this.state;

    return (
      <View style={styles.container}>
        <SectionTitle title={I18n.t('assign_driver')} />

        {order.accepted_job ? (
          <Text onPress={() => this.showModal(true)} style={styles.driver}>
            {order.accepted_job.driver.user.name}
          </Text>
        ) : (
          <Text onPress={() => this.showModal(true)}>
            {I18n.t('select_driver')}
          </Text>
        )}

        <Modal
          animationType="slide"
          visible={showModal}
          presentationStyle="fullScreen">
          <View style={styles.modalContainer}>
            <DriversList
              items={drivers}
              onItemPress={this.selectDriver}
              activeItemID={0}
            />

            <View style={styles.buttonsContainer}>
              <Button
                title={I18n.t('close')}
                onPress={() => this.showModal(false)}
                style={styles.button}
                background="error"
              />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  modalContainer: {
    padding: 20,
    paddingHorizontal: 0,
    margin: 20,
  },

  categoryTitle: {
    fontSize: 18,
    color: colors.darkGrey,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    paddingVertical: 10,
  },
  driver: {
    fontSize: 20,
    fontWeight: '500',
  },
});
