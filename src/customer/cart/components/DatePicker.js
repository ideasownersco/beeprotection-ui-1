import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export default class DatePicker extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItem !== this.props.activeItem
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItem} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)}>
        <View
          style={[
            styles.itemContainer,
            activeItem.format('DD/MM') === item.format('DD/MM') &&
              styles.itemContainerActive,
          ]}>
          <Text
            style={[
              styles.day,
              activeItem.format('DD/MM') === item.format('DD/MM') &&
                styles.dayActive,
            ]}>
            {item.format('ddd').toUpperCase()}
          </Text>
          <Text
            style={[
              styles.date,
              activeItem.format('DD/MM') === item.format('DD/MM') &&
                styles.dateActive,
            ]}>
            {item.date()}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItem} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{I18n.t('date')}</Text>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={(item, index) => `${index}`}
          horizontal={true}
          extraData={activeItem}
        />
      </View>
    );
  }
}

DatePicker.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  activeItem: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    // marginVertical:30,
  },
  listContainer: {
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.lightGrey,
  },
  itemContainer: {
    padding: 10,
    alignItems: 'center',
  },
  day: {
    color: colors.darkGrey,
    fontSize: 15,
  },
  date: {
    fontSize: 29,
    color: colors.darkGrey,
  },
  itemContainerActive: {
    backgroundColor: colors.primary,
  },
  dayActive: {
    color: colors.white,
  },
  dateActive: {
    color: colors.white,
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
