import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';

export default class AddressesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;
    return (
      <Touchable
        onPress={() => (!item.area.active ? {} : onItemPress(item))}
        key={item.id}>
        <View
          style={[
            styles.itemContainer,
            item.area.active
              ? activeItemID === item.id && styles.itemContainerActive
              : {opacity: 0.5},
          ]}>
          <Text
            style={[
              styles.addressField,
              activeItemID === item.id && styles.addressFieldActive,
            ]}>
            <Text>{item.area.name} ,</Text>
            <Text>
              {' '}
              {I18n.t('block')} {item.block},{' '}
            </Text>
            <Text>
              {' '}
              {I18n.t('street')} {item.street},{' '}
            </Text>
            {item.avenue && (
              <Text>
                {I18n.t('avenue')} {item.avenue},{' '}
              </Text>
            )}
            <Text>
              {I18n.t('building')} {item.building}
            </Text>
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        extraData={activeItemID}
      />
    );
  }
}

AddressesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {
    margin: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    marginVertical: 5,
  },
  addressField: {
    color: colors.darkGrey,
    fontWeight: '500',
  },
  itemContainerActive: {
    backgroundColor: colors.primary,
  },
  addressFieldActive: {
    color: colors.white,
  },
});
