import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeActionButtons from 'customer/components/HomeActionButtons';

export default class StandingOrdersList extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onItemTrackPress: PropTypes.func.isRequired,
    onCreateOrderPress: PropTypes.func.isRequired,
  };

  renderItem = ({item}) => {
    const {onItemPress, onItemTrackPress} = this.props;
    return (
      <View style={[styles.buttonContainer]}>
        <Touchable
          style={styles.itemContentContainer}
          onPress={() => onItemPress(item)}>
          <View>
            <Text style={[styles.dateTime, {fontWeight: 'bold'}]}>
              {I18n.t('order_details')}
            </Text>

            {item.packages.map((packageItem, index) => (
              <View key={`${index}`}>
                <Text style={styles.dateTime}>{packageItem.category.name}</Text>
                <Text style={styles.dateTime}>{packageItem.name},</Text>
              </View>
            ))}

            <Text style={styles.dateTime}>
              {item.date} {item.time}
            </Text>
          </View>
        </Touchable>

        <Touchable onPress={() => onItemTrackPress(item)}>
          <View style={{alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="map-marker"
              color="#a51300"
              size={50}
            />
            <Text style={styles.dateTime}>{I18n.t('track')}</Text>
          </View>
        </Touchable>
      </View>
    );
  };

  render() {
    const {items, onCreateOrderPress} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={
          <HomeActionButtons onCreateOrderPress={onCreateOrderPress} />
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  contentContainerStyle: {},
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 2,
    width: Dimensions.get('window').width - 60,
    marginVertical: 10,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 16,
    color: colors.white,
  },
  viewAll: {
    fontSize: 15,
    fontWeight: '500',
  },
  rightButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 20,
  },
  itemContentContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  sectionTitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    paddingVertical: 10,
  },
});
