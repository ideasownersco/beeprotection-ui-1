import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import IconFactory from 'components/IconFactory';
import {Caption, Paragraph, Title} from 'react-native-paper';
import ListItem from 'components/ListItem';

export default class OrdersList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onStartStopButtonPress: PropTypes.func.isRequired,
    onAddressButtonPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress, onAddressButtonPress} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View style={[styles.itemContainer]}>
          <View style={{flex: 4}}>
            <ListItem
              title={`${item.date}, ${item.time}`}
              description={item.full_address}
            />
          </View>

          <Touchable onPress={() => onItemPress(item)}>
            <View style={styles.trackButton}>
              <IconFactory
                name="map-marker"
                type="MaterialCommunityIcons"
                color="#a51300"
                size={40}
              />
              <Caption>{I18n.t('address')}</Caption>
            </View>
          </Touchable>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 18,
    paddingRight: 10,
    color: colors.darkGrey,
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
  trackButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
});
