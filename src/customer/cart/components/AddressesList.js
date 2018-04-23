import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Divider from "components/Divider";
import CheckedListItem from "components/CheckedListItem";

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
      <CheckedListItem
        checked={activeItemID === item.id}
        onPress={() => (!item.area.active ? {} : onItemPress(item))}
        title={item.area.name}
        description={`${I18n.t('block')} ${item.block}, ${I18n.t('street')} ${item.street}, ${I18n.t('avenue')} ${item.avenue}, ${I18n.t('building')} ${item.building}`}
      />
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
  listContainer: {
  },
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
