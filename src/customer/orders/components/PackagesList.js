/**
 @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Slider, StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Accordion from 'react-native-collapsible/Accordion';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Touchable from 'react-native-platform-touchable';
import IconFactory from 'components/IconFactory';
import FormLabel from 'components/FormLabel';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import {Title} from 'react-native-paper';

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

  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  renderSectionHeader = items => {
    return items
      .map(item => item)
      .sort((a, b) => parseInt(a.order) - parseInt(b.order));
  };

  componentDidUpdate() {
    console.log('this.props',this.props);
    if(!this.props.activeItemID && this.props.items.length === 1) {

      this.props.onItemPress(this.props.items[0]);

      setTimeout(()=>{
        if(this.props.activeCategoryID === 4) {
          this.props.selectQuantity(10);
        }
      },1);
      // if(this.props.activeCategoryID === 4) {
      //   this.props.selectQuantity(10);
      // }

    }
  }

  renderHeader = (item, index, isActive) => {
    let {onItemPress, activeItemID} = this.props;
    return (
      <View style={styles.headerContainer}>
        <Touchable onPress={() => onItemPress(item)} key={item.id}>
          <IconFactory
            type="FontAwesome"
            name={item.id === activeItemID ? 'check-circle' : 'circle-thin'}
            color={colors.primary}
            size={30}
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
    let {selectQuantity, quantity, activeItemID} = this.props;

    return (
      <View style={styles.contentContainer}>
        <View style={styles.rowContent}>
          <Text style={[styles.itemName]}>{item.description}</Text>
          {item.price && <Text style={styles.price}>{item.price} KD</Text>}
        </View>
        {!!item.show_quantity && (
          <View>
            <Divider style={{marginVertical: 10}} />
            <View style={styles.sectionContainer}>
              <FormLabel title={I18n.t('select_feet')} />
              <Text> : </Text>
              <Title>{quantity} ft</Title>
            </View>
            <Slider
              disabled={!activeItemID}
              step={1}
              value={quantity}
              maximumValue={100}
              minimumValue={1}
              onValueChange={value => selectQuantity(value)}
            />
          </View>
        )}
      </View>
    );
  };

  render() {
    const {items} = this.props;

    return (
      <View style={styles.listContainer}>
        <Accordion
          sections={this.renderSectionHeader(items)}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          underlayColor="transparent"
          initiallyActiveSection={0}
        />
      </View>
    );
  }
}

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
