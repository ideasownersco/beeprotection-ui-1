import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import colors from 'assets/theme/colors';
import SectionTitle from 'components/SectionTitle';
import OrderItems from 'customer/orders/components/OrderItems';

export default class OrderSection extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  render() {
    const {items, title} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <SectionTitle title={title} style={styles.sectionTitle} />
        </View>
        <OrderItems order={items} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
  },
  listContainer: {
    flex: 1,
    marginVertical: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#efefef',
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 20,
    paddingRight: 10,
  },
  categoryName: {
    fontSize: 20,
  },
  itemContentContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  confirmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  categoryTitle: {
    fontSize: 20,
    paddingHorizontal: 5,
  },
  packageItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  packageTitle: {
    flex: 4,
    fontSize: 16,
    color: colors.mediumGrey,
  },
  packagePrice: {
    flex: 1,
    color: colors.primary,
    fontSize: 15,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceTitle: {
    flex: 3,
    paddingLeft: 20,
    fontSize: 18,
    color: colors.darkGrey,
  },
  servicePrice: {
    flex: 1,
    color: colors.primary,
    fontSize: 16,
    textAlign: 'right',
  },
  orderNo: {
    color: colors.mediumGrey,
  },
});
