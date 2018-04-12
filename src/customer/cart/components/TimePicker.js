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

  renderTime = (item) => {
    const {onItemPress, activeItemID} = this.props;

    return (
      <View
        style={[
          styles.itemContainer,
          item.disabled ? {opacity:.3} : activeItemID === item.id && styles.itemContainerActive
        ]}>
        <Text
          style={[
            styles.time,
            !item.disabled && activeItemID === item.id && styles.timeActive,
          ]}>
          {item.name_short}
        </Text>
        <Text>
          {item.period}
        </Text>
      </View>
    );
  };

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;

    if (item.disabled) {
      return (
        this.renderTime(item)
      );
    }

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        {
          this.renderTime(item)
        }
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID, isFetching} = this.props;

    return (

      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        horizontal={true}
        extraData={activeItemID}
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
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGrey
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
});
