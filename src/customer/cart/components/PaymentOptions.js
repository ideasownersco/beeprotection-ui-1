import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';

export default class PaymentOptions extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.activeItemID !== this.props.activeItemID;
  // }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    const {category, services} = item;
    return (
      <Touchable
        style={styles.itemContainer}
        onPress={() => onItemPress(item)}
        key={item.id}>
        <View>
          <LocalizedText ar={category.name_ar} en={category.name_en} />
          <LocalizedText ar={item.package.name_ar} en={item.package.name_en} />
          <Text>{item.package.price}</Text>
          {item.services.map(service => (
            <View>
              <LocalizedText ar={service.name_ar} en={service.name_en} />
              <Text>{service.price} </Text>
            </View>
          ))}
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
        keyExtractor={(item, index) => index}
        extraData={activeItemID}
      />
    );
  }
}

PaymentOptions.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  // activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
});
