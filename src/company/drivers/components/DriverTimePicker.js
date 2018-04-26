import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import TimePicker from 'customer/cart/components/TimePicker';
import {Title} from 'react-native-paper';
import Divider from 'components/Divider';

export default class DriverTimePicker extends Component {
  static propTypes = {
    onStartTimePress: PropTypes.func.isRequired,
    onEndTimePress: PropTypes.number,
    timings: PropTypes.array.isRequired,
    start_time_id: PropTypes.number,
    end_time_id: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.timings !== this.props.timings ||
      nextProps.start_time_id !== this.props.start_time_id ||
      nextProps.end_time_id !== this.props.end_time_id
    );
  }

  render() {
    const {
      timings,
      onStartTimePress,
      onEndTimePress,
      start_time_id,
      end_time_id,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Title style={{textAlign: 'center'}}>Start Time</Title>
          <TimePicker
            onItemPress={onStartTimePress}
            isFetching={false}
            items={timings}
            activeItemID={start_time_id}
            hideDisabledItem={false}
          />
        </View>

        <Divider />

        <View style={styles.listContainer}>
          <Title style={{textAlign: 'center'}}>End Time</Title>
          <TimePicker
            onItemPress={onEndTimePress}
            isFetching={false}
            items={timings}
            activeItemID={end_time_id}
            hideDisabledItem={false}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  listContainer: {
    paddingVertical: 50,
    paddingHorizontal: 5,
    backgroundColor: colors.lightGrey,
  },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  itemContainerActive: {
    backgroundColor: colors.white,
  },
  time: {
    fontSize: 50,
    color: colors.darkGrey,
  },
  timeActive: {
    color: colors.primary,
  },
  day: {
    color: colors.darkGrey,
    fontSize: 12,
    fontWeight: '700',
    marginTop: -5,
  },
  dayActive: {
    color: colors.primary,
  },
});
