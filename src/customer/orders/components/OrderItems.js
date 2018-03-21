import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
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
          <View key={packageModel.id}>
            <View style={styles.packageItemContainer}>
              <Text style={styles.categoryTitle}>
                {packageModel.category.name}
              </Text>
            </View>

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
                      <View style={styles.serviceListContainer}>
                        <Text style={styles.serviceTitle}>{service.name} </Text>
                        <Text style={styles.servicePrice}>
                          {service.price} KD
                        </Text>
                      </View>
                      <Separator style={{flex: 1, marginVertical: 5}} />
                    </View>
                  );
                })}
          </View>
        ))}

        {/*{item.services.map((service, index) => (*/}
        {/*<View style={{flex: 1}} key={index}>*/}
        {/*<View style={styles.serviceListContainer}>*/}
        {/*<Text style={styles.serviceTitle}>{service.name}</Text>*/}
        {/*<Text style={styles.servicePrice}>{service.price} KD</Text>*/}
        {/*</View>*/}
        {/*<Separator style={{flex: 1, marginVertical: 5}} />*/}
        {/*</View>*/}
        {/*))}*/}
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
    alignItems: 'center',
  },
  servicePrice: {
    flex: 1,
    color: colors.primary,
    fontSize: 16,
    textAlign: 'right',
  },
  serviceTitle: {
    flex: 3,
    color: colors.darkGrey,
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 40,
  },
});
