import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import CheckedListItem from 'components/CheckedListItem';
import AddressInfo from '../../../components/AddressInfo';

export default class AddressesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;

    if (!item.area.active) {
      return (
        <CheckedListItem
          disabled={true}
          title={item.area.name || item.area.name_en}
          description={
            <AddressInfo address={item} style={{color: colors.darkGrey}} />
          }
        />
      );
    }

    return (
      <CheckedListItem
        checked={activeItemID === item.id}
        onPress={() => onItemPress(item)}
        title={item.area.name || item.area.name_en}
        description={
          <AddressInfo address={item} style={{color: colors.darkGrey}} />
        }
      />
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <FlatList
        data={items.filter(item => item.area !== null || undefined)}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        extraData={activeItemID}
        ItemSeparatorComponent={() => <Divider />}
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
  listContainer: {},
  itemContainer: {
    flexDirection: 'row',
    padding: 5,
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
