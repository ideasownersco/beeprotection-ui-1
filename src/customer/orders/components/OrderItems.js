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
  container: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
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
});
