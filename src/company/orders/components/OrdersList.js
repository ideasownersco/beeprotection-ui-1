import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'utils/locale';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Divider from 'components/Divider';

export default class OrdersList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
    onPullToRefresh: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onFetchMore: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isFetching: false,
    onPullToRefresh: () => {},
    onFetchMore: () => {},
    activeItemID: undefined,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            item.id === activeItemID && {backgroundColor: colors.white},
          ]}>
          <View style={{flex: 1}}>
            <View style={styles.itemContentContainer}>
              <Text style={styles.dateTime}>
                {item.date}, {item.time}
              </Text>
            </View>

            <Text style={styles.orderNo}>
              {I18n.t('order_no')} : {item.id}
            </Text>
            {item.confirmed && (
              <View style={styles.confirmedContainer}>
                <Text style={styles.statusValue}>{I18n.t('confirmed')}</Text>
                <Ionicons
                  name="ios-checkmark-circle"
                  color={colors.success}
                  size={24}
                />
              </View>
            )}
          </View>

          <SimpleLineIcons
            name="arrow-right"
            size={25}
            color={colors.mediumGrey}
          />
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, onPullToRefresh, isFetching, onFetchMore} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <Divider />}
        scrollEventThrottle={120}
        ref="listView"
        onRefresh={() => onPullToRefresh()}
        refreshing={isFetching}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustContentInsets={false}
        enableEmptySections={true}
        initialListSize={20}
        onEndReachedThreshold={1}
        onEndReached={() => !isFetching && onFetchMore()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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
