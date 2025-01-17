import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import {Subheading} from 'react-native-paper';
import I18n from 'utils/locale';
import IconFactory from '../../../components/IconFactory';

export default class CartItems extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };
  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    const {category, services} = item;

    return (
      <View style={styles.itemContainer}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.categoryTitle, {flex: 1, flexDirection: 'row'}]}>
            {category.name}
          </Text>

          <Touchable
            onPress={() => onItemPress(item)}
            key={item.id}
            style={styles.deleteButton}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{I18n.t('delete')}</Text>
              <IconFactory type="MaterialIcons" name="delete" />
            </View>
          </Touchable>
        </View>
        <View style={styles.packageItemContainer}>
          <Text style={styles.packageTitle}>
            {item.package.name}
            {item.package.show_quantity && item.quantity ? (
              <Subheading> - {item.quantity} feet</Subheading>
            ) : null}
          </Text>
          <Text style={styles.packagePrice}>
            {item.package.price} KD
            {item.package.show_quantity && item.quantity ? (
              <Subheading> x {item.quantity} </Subheading>
            ) : null}
          </Text>
        </View>
        {item.services.map((service, index) => (
          <View style={{flex: 1}} key={index}>
            <Divider style={{marginVertical: 10}} />

            <View style={styles.serviceListContainer}>
              <Text style={styles.packageTitle}>{service.name}</Text>
              <Text style={styles.packagePrice}>{service.price} KD</Text>
            </View>
          </View>
        ))}
      </View>
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
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 15}} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 0,
    padding: 10,
  },
  itemContainer: {
    // padding: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 20,
    color: colors.darkGrey,
    // color: '#aa2d29',
    // fontWeight: 'bold',
    textAlign: 'left',
  },
  packageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  packageTitle: {
    flex: 1,
    fontSize: 17,
    color: colors.mediumGrey,
    paddingLeft: 10,
    textAlign: 'left',
  },
  packagePrice: {
    color: colors.primary,
    fontSize: 17,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
  },
  total: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  totalPrice: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
  deleteButton: {
    backgroundColor: '#E7E7E7',
    padding: 5,
  },
});
