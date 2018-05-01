import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';

export default class PhotosList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onItemDeletePress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress, onItemDeletePress} = this.props;

    return (
      <Touchable onPress={() => onItemPress(item)} style={styles.row}>
        <Image source={{uri: item.url}} style={styles.image} />
      </Touchable>
    );
  };

  render() {
    const {items} = this.props;
    console.log('items', items);
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={styles.contentContainer}
        enableEmptySections={true}
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        contentInset={{bottom: 50}}
        numColumns={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  row: {
    justifyContent: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#CCC',
    height: 130,
    width: 130,
  },
  cameraIcon: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    backgroundColor: colors.lightGrey,
    height: 120,
    width: 120,
  },
  iconContainer: {
    position: 'absolute',
    zIndex: 1000,
    top: -15,
    left: -5,
  },
});
