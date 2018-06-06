import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export default class DatePicker extends Component {
  static propTypes = {
    onItemPress: PropTypes.func.isRequired,
    activeItem: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItem !== this.props.activeItem
    );
  }

  renderDay = day => {
    const {activeItem} = this.props;

    return (
      <View>
        <View
          style={[
            styles.itemContainer,
            activeItem.format('DD/MM') === day.format('DD/MM') &&
              styles.itemContainerActive,
          ]}>
          {day.isSame(new Date(), 'day') ? (
            <Text
              style={{
                textAlign: 'center',
                paddingVertical: 5,
                fontWeight: '500',
              }}>
              {I18n.t('today').toUpperCase()}
            </Text>
          ) : (
            <Text style={{paddingTop: 15}} />
          )}

          <Text
            style={[
              styles.day,
              activeItem.format('DD/MM') === day.format('DD/MM') &&
                styles.dayActive,
            ]}>
            {day.format('ddd').toUpperCase()}
          </Text>
          <Text
            style={[
              styles.date,
              activeItem.format('DD/MM') === day.format('DD/MM') &&
                styles.dateActive,
            ]}>
            {day.date()}
          </Text>
        </View>
      </View>
    );
  };

  renderItem = ({item}) => {
    const {onItemPress} = this.props;

    return (
      <View style={[item.day() === 5 && styles.itemContainerDisabled]}>
        {item.day() === 5 ? (
          this.renderDay(item)
        ) : (
          <Touchable onPress={() => onItemPress(item)}>
            {this.renderDay(item)}
          </Touchable>
        )}
      </View>
    );
  };

  render() {
    const {items, activeItem} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        horizontal={true}
        extraData={activeItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.lightGrey,
    borderWidth: 1,
    borderColor: colors.lightGrey,
  },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  itemContainerActive: {
    backgroundColor: colors.white,
  },
  day: {
    color: colors.darkGrey,
    fontSize: 13,
  },
  dayActive: {
    color: colors.primary,
  },
  date: {
    fontSize: 50,
    color: colors.darkGrey,
  },
  dateActive: {
    color: colors.primary,
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  itemContainerDisabled: {
    opacity: 0.4,
  },
});
