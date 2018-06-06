import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import IconFactory from 'components/IconFactory';

export default class TimePicker extends Component {
  static propTypes = {
    hideDisabledItem: PropTypes.bool,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        disabled: PropTypes.bool,
      }).isRequired,
    ),
  };

  static defaultProps = {
    hideDisabledItem: true,
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID ||
      nextProps.isFetching !== this.props.isFetching
    );
  }

  renderTime = item => {
    const {activeItemID, hideDisabledItem} = this.props;
    return (
      <View
        style={[
          styles.itemContainer,
          item.disabled && hideDisabledItem
            ? {opacity: 0.3}
            : activeItemID === item.id && styles.itemContainerActive,
        ]}>
        <IconFactory
          name={item.isDay ? 'ios-sunny' : 'ios-moon'}
          type="Ionicons"
          color={item.isDay ? '#ebbd21' : colors.darkGrey}
          size={22}
        />

        <Text
          style={[
            styles.time,
            !item.disabled && activeItemID === item.id && styles.timeActive,
          ]}>
          {item.name_short}
        </Text>
        <Text
          style={[
            styles.day,
            !item.disabled && activeItemID === item.id && styles.timeActive,
          ]}>
          {item.period}
        </Text>
      </View>
    );
  };

  renderItem = ({item}) => {
    const {onItemPress, hideDisabledItem} = this.props;

    if (item.disabled && hideDisabledItem) {
      return this.renderTime(item);
    }

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        {this.renderTime(item)}
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID, isFetching} = this.props;

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={[styles.listContainer, isFetching && {opacity: 0.5}]}
        keyExtractor={(item, index) => `${index}`}
        horizontal={true}
        extraData={activeItemID}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  listContainer: {
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
