import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class TimePicker extends Component {
  static propTypes = {
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

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID ||
      nextProps.isFetching !== this.props.isFetching
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;

    if (item.disabled) {
      return (
        <View
          style={[
            styles.itemContainer,
            activeItemID === item.id && styles.itemContainerActive,
            {opacity: 0.1},
          ]}>
          <Text
            style={[
              styles.time,
              activeItemID === item.id && styles.timeActive,
            ]}>
            {item.name}
          </Text>
        </View>
      );
    }

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            activeItemID === item.id && styles.itemContainerActive,
          ]}>
          <Text
            style={[
              styles.time,
              activeItemID === item.id && styles.timeActive,
            ]}>
            {item.name}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID, isFetching} = this.props;

    return (
      <View style={[styles.container, isFetching && {opacity: 0.1}]}>
        <Text style={styles.sectionTitle}>{I18n.t('time')}</Text>

        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={(item, index) => `${index}`}
          horizontal={true}
          extraData={activeItemID}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  listContainer: {
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.lightGrey,
  },
  itemContainer: {
    padding: 10,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  itemContainerActive: {
    backgroundColor: colors.primary,
  },
  time: {
    fontSize: 29,
    color: colors.darkGrey,
  },
  timeActive: {
    color: colors.white,
  },
});
