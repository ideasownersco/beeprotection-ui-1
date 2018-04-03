import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
import SectionTitle from 'components/SectionTitle';

export default class OrderItems extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.order !== this.props.order;
  }

  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  render() {
    const {order} = this.props;
    const {packages} = order;
    return (
      <View style={styles.itemContainer}>
        {packages.map((packageModel, index) => (
          <View key={packageModel.id}>
            <SectionTitle
              title={packageModel.category.name}
              style={styles.packageItemContainer}
            />

            <View style={styles.serviceListContainer}>
              <Text style={styles.serviceTitle}>{packageModel.name}</Text>
              {packageModel.price && (
                <Text style={styles.servicePrice}>{packageModel.price} KD</Text>
              )}
            </View>

            <Separator style={{marginVertical: 5}} />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  packageItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  packageTitle: {
    flex: 4,
    fontSize: 16,
    color: colors.darkGrey,
    fontWeight: 'bold',
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
    flex: 4,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
});
