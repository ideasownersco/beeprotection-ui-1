import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import Divider from 'components/Divider';

export default class DriversList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  static defaultProps = {
    activeItemID: 0,
  };

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            activeItemID === item.id && {
              backgroundColor: colors.primary,
            },
          ]}>
          <View style={styles.imageContainer}>
            {item.user.image ? (
              <Image source={{uri: item.user.image}} style={styles.image} />
            ) : (
              <Feather name="user" size={30} style={styles.image} />
            )}
          </View>

          <Text
            style={[
              styles.title,
              activeItemID === item.id && {
                backgroundColor: colors.white,
              },
            ]}>
            {item.user.name}
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
        keyExtractor={item => `${item.id}`}
        extraData={activeItemID}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 5}} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: colors.fadedWhite,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
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
});
