import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import CheckedListItem from 'components/CheckedListItem';
import AddressInfo from 'components/AddressInfo';
import I18n from 'utils/locale';
import Touchable from 'react-native-platform-touchable';

export default class AddressesList extends Component {

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderRow = ({item}) => {
    return (
      <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Text hitSlop={{top:10,left:10,bottom:10,right:10}} style={{padding:5}} onPress={()=>this.props.deleteAddress(item)}>{I18n.t('delete')}</Text>
        {/*<Touchable hitSlop={{top:10,left:10,bottom:10,right:10}}  onPress={()=>this.props.deleteAddress(item)}>{I18n.t('delete')}</Touchable>*/}
        <View style={{flex:1}}>
          {this.renderItem(item)}
        </View>
      </View>
    );
  };

  renderItem = (item) => {
    const {onItemPress, activeItemID} = this.props;

    if (!item.area.active) {
      return (
        <CheckedListItem
          disabled={true}
          title={item.area.name || item.area.name_en}
          description={
            <AddressInfo address={item} style={{color: colors.darkGrey}} />
          }
          onPress={()=>{}}
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
    const {items, activeItemID,deletedAddresses} = this.props;
    return (
      <FlatList
        data={items.filter(item => item.area !== null || undefined).filter(item => !deletedAddresses.includes(item.id))}
        renderItem={this.renderRow}
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
