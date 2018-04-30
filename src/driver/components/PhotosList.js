import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import IconFactory from "../../components/IconFactory";

export default class PhotosList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onItemDeletePress: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items
    );
  }

  renderItem = ({item}) => {
    const {onItemPress,onItemDeletePress} = this.props;

    return (
      <View style={styles.row}>
        {/*<Touchable*/}
          {/*onPress={() => onItemDeletePress(item)}*/}
          {/*underlayColor="transparent"*/}
          {/*style={styles.iconContainer}*/}
          {/*hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>*/}
          {/*<IconFactory*/}
            {/*name="ios-close"*/}
            {/*type="Ionicons"*/}
            {/*style={{*/}
              {/*backgroundColor: 'transparent',*/}
            {/*}}*/}
            {/*color="red"*/}
            {/*size={30}*/}
          {/*/>*/}
        {/*</Touchable>*/}
        <Touchable onPress={() => onItemPress(item)}>
          <Image source={{uri: item.url}} style={styles.image}/>
        </Touchable>
      </View>
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
    padding:10
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
  }
});
