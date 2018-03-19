import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
import SectionTitle from 'components/SectionTitle';
import I18n from 'utils/locale';

export default class CartItems extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    const {category, services} = item;

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View style={styles.itemContainer}>
          <Text style={styles.categoryTitle}>{category.name}</Text>

          <View style={styles.packageItemContainer}>
            <Text style={styles.packageTitle}>{item.package.name}</Text>
            <Text style={styles.packagePrice}>{item.package.price} KD</Text>
          </View>
          {item.services.map((service, index) => (
            <View style={{flex: 1}} key={index}>
              <View style={styles.serviceListContainer}>
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price} KD</Text>
              </View>
              <Separator style={{flex: 1, marginVertical: 5}} />
            </View>
          ))}

          <View style={styles.packageItemContainer}>
            {/*<Text style={styles.total}>{I18n.t('total')}</Text>*/}
            <Text style={styles.totalPrice}>{item.total} KD</Text>
          </View>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <View style={styles.container}>
        <SectionTitle
          title={I18n.t('order_details')}
          style={{paddingHorizontal: 5}}
        />

        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={(item, index) => `${index}`}
          extraData={activeItemID}
        />
      </View>
    );
  }
}

CartItems.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  listContainer: {
    paddingTop: 10,
  },
  itemContainer: {
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 18,
    color: '#aa2d29',
    fontWeight: 'bold',
  },
  packageItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  packageTitle: {
    flex: 4,
    fontSize: 20,
    color: colors.darkGrey,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  packagePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
  },
  serviceTitle: {
    flex: 3,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 40,
  },
  servicePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
  total: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  totalPrice: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});
