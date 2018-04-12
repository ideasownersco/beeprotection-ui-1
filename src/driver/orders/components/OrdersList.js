import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Separator from 'components/Separator';
import Button from 'components/Button';

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
    const {
      onItemPress,
      activeItemID,
      onStartStopButtonPress,
      onAddressButtonPress,
    } = this.props;
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

            <Separator/>

            <View style={styles.itemContentContainer}>

              {
                item.status === 'reached'
                &&
                <Button
                  title={I18n.t('start')}
                  style={{borderRadius: 10, flex: 1, marginRight: 10}}
                  background="error"
                  onPress={() => onStartStopButtonPress(item)}
                />
              }

              <Button
                title={I18n.t('address')}
                style={{borderRadius: 10, flex: 1}}
                background="secondary"
                onPress={() => onAddressButtonPress(item)}
              />
            </View>
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
    const {items} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => `${item.id}`}
        ItemSeparatorComponent={() => <Separator/>}
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
