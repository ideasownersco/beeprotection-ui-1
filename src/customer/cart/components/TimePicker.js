import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class TimePicker extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)}>
        <View
          style={[
            styles.itemContainer,
            activeItemID === item.id && styles.itemContainerActive,
          ]}>
          <LocalizedText
            ar={item.name_ar}
            en={item.name_en}
            style={[styles.time, activeItemID === item.id && styles.timeActive]}
          />
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>{I18n.t('time')}</Text>

        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={(item, index) => item.id}
          horizontal={true}
          extraData={activeItemID}
        />
      </View>
    );
  }
}

TimePicker.propTypes = {
  onItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.number,
};

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
