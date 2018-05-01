/**
 @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';

let SectionHeader = ({item}) => {
  return (
    <View style={[styles.sectionContainer]}>
      <View>
        <Text style={[styles.headerText]}>{item.name}</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default class PackagesList extends Component {
  renderSectionHeader = items => {
    return items.map(item => item);
  };

  renderHeader = (item, index, isActive) => {
    let {onItemPress, activeItemID} = this.props;
    return (
      <View style={styles.headerContainer}>
        <Touchable onPress={() => onItemPress(item)} key={item.id}>
          <FontAwesome
            name={item.id === activeItemID ? 'check-circle' : 'circle-thin'}
            color={colors.primary}
            size={25}
            style={[{flex: 0.1, paddingTop: 5, paddingRight: 5}, styles.icon]}
          />
        </Touchable>

        <SectionHeader item={item} />

        <FontAwesome
          name={isActive ? 'minus-square-o' : 'plus-square-o'}
          color={colors.primary}
          size={25}
          style={styles.icon}
        />
      </View>
    );
  };

  renderContent = item => {
    return (
      <View>
        <View style={styles.contentContainer}>
          <View style={styles.rowContent}>
            <Text style={[styles.itemName]}>{item.description}</Text>
            {item.price && <Text style={styles.price}>{item.price} KD</Text>}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {items} = this.props;

    return (
      <View style={styles.container}>
        {/*<Text style={styles.sectionTitle}>{I18n.t('packages')}</Text>*/}

        <View style={styles.listContainer}>
          <Accordion
            sections={this.renderSectionHeader(items)}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            underlayColor="transparent"
            expanded={false}
          />
        </View>
      </View>
    );
  }
}

PackagesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

let styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
  },
  container: {
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  contentContainer: {},
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    color: colors.black,
    flex: 1,
    textAlign: 'left',
  },
  itemValue: {
    color: colors.darkGrey,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: colors.lightGrey,
    marginHorizontal: 10,
  },
  icon: {},
  headerText: {
    textAlign: 'left',
    fontSize: 25,
    color: colors.fadedBlack,
    alignSelf: 'center',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
