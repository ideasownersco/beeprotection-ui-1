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

let SectionHeader = ({item,onPress}) => {
  return (
    <Touchable onPress={onPress} style={[styles.sectionContainer]} >
      <View>
        <Text style={[styles.headerText]}>{item.name}</Text>
      <View style={styles.line} />
      </View>
    </Touchable>
  );
};

export default class PackagesList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  state = {
    activeSection:0
  };

  componentDidMount() {
    if(!this.props.activeItemID) {
      this.setState({
        activeSection: 0
      }, () => {
        this.props.onItemPress(this.props.items[0]);
      });
    }
  }

  componentDidUpdate() {
    // if(!this.props.activeItemID && this.props.items.length === 1) {
    if(!this.props.activeItemID) {
      this.setState({
        activeSection:0
      },()=>{
        this.props.onItemPress(this.props.items[0]);
      });

      setTimeout(()=>{
        if(this.props.activeCategoryID === 4) {
          this.props.selectQuantity(10);
        }
      },1);
    }
  }

  onItemPress = (item,index) => {
    this.setState({
      activeSection:index
    });
    this.props.onItemPress(item);
  };

  renderSectionHeader = items => {
    return items
      .map(item => item)
      .sort((a, b) => parseInt(a.order) - parseInt(b.order));
  };

  renderHeader = (item, index, isActive) => {
    let {onItemPress, activeItemID} = this.props;
    return (
      <View style={styles.headerContainer}>
        <Touchable onPress={() => this.onItemPress(item,index)} key={item.id}>
          <IconFactory
            type="FontAwesome"
            name={item.id === activeItemID ? 'check-circle' : 'circle-thin'}
            color={colors.primary}
            size={30}
          />
        </Touchable>
        <SectionHeader item={item} onPress={() => this.onItemPress(item,index)}/>
        {/*<FontAwesome*/}
          {/*name={isActive ? 'minus-square-o' : 'plus-square-o'}*/}
          {/*color={colors.primary}*/}
          {/*size={25}*/}
          {/*style={styles.icon}*/}
        {/*/>*/}
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
            <Divider style={{marginVertical: 10}} />
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

    console.log('this.props.activeItemID',this.props.activeItemID);

    return (
      <View style={styles.listContainer}>
        <Accordion
          sections={this.renderSectionHeader(items)}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          underlayColor="transparent"
          initiallyActiveSection={this.state.activeSection}
          activeSection={this.state.activeSection}
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
