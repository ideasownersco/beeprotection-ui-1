import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text, Image} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import Separator from 'components/Separator';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class ServicesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemIDs !== this.props.activeItemIDs
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemIDs} = this.props;

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            activeItemIDs.indexOf(item.id) > -1 && {
              backgroundColor: colors.white,
            },
          ]}>
          <Image
            source={{uri: item.image}}
            style={styles.image}
            resizeMode="contain"
          />
          <LocalizedText
            style={[
              styles.title,
              activeItemIDs.indexOf(item.id) > -1 && {
                color: colors.primary,
                fontWeight: 'bold',
              },
            ]}
            ar={item.name_ar}
            en={item.name_en}
          />
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemIDs} = this.props;

    return (
      <View style={styles.container}>
        <Separator style={{marginVertical: 10}} />

        <Text style={styles.sectionTitle}>{I18n.t('addons')}</Text>

        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={item => `${item.id}`}
          horizontal={true}
          extraData={activeItemIDs}
        />
      </View>
    );
  }
}

ServicesList.propTypes = {
  items: PropTypes.array,
  onItemPress: PropTypes.func.isRequired,
  activeItemIDs: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  listContainer: {
    backgroundColor: '#efefef',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
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
