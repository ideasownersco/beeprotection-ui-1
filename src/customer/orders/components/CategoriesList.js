import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text, Image} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';

export default class CategoriesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
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
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="contain"
          />
          <Text
            style={[
              styles.title,
              item.id === activeItemID && {
                color: colors.primary,
                fontWeight: 'bold',
              },
            ]}>
            {item.name}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID} = this.props;

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        horizontal={true}
        extraData={activeItemID}
      />
    );
  }
}

CategoriesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#efefef',
  },
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: colors.lightGrey,
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  title: {},
});
