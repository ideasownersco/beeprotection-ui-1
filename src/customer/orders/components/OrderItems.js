import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import SectionTitle from 'components/SectionTitle';
import I18n from 'utils/locale';

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
      <View style={styles.container}>
        <SectionTitle title={I18n.t('order_details')} />

        {packages.map((packageModel, index) => (
          <View style={styles.itemContainer} key={packageModel.id}>
            <Text style={styles.categoryTitle}>
              {packageModel.category.name}
            </Text>

            <View style={styles.packageItemContainer}>
              <Text style={styles.packageTitle}>{packageModel.name}</Text>
              {packageModel.price && (
                <Text style={styles.packagePrice}>{packageModel.price} KD</Text>
              )}
            </View>

            {order.services &&
              order.services.length &&
              order.services
                .filter(service => service.package.id === packageModel.id)
                .map(service => {
                  return (
                    <View style={{flex: 1}} key={service.id}>
                      <Divider style={{marginVertical: 10}} />

                      <View style={styles.serviceListContainer}>
                        <Text style={styles.packageTitle}>{service.name} </Text>
                        <Text style={styles.packagePrice}>
                          {service.price} KD
                        </Text>
                      </View>
                    </View>
                  );
                })}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
  },
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
    fontSize: 20,
    paddingHorizontal: 10,
  },
  totalPrice: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});
