/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import {Checkbox} from 'react-native-paper';
import I18n from 'utils/locale';
import ListModal from 'components/ListModal';

export default class List extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    title: PropTypes.string,
    activeIDs: PropTypes.array,
  };

  static defaultProps = {
    title: I18n.t('select_country'),
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.isVisible !== nextProps.isVisible ||
      this.props.activeIDs !== nextProps.activeIDs ||
      this.props.items !== nextProps.items
    );
  }

  renderItem = ({item}) => {
    let {onConfirm, activeIDs} = this.props;
    return (
      <Touchable onPress={() => onConfirm(item)}>
        <View style={styles.itemRowContainer}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Checkbox checked={activeIDs.includes(item.id)} />
        </View>
      </Touchable>
    );
  };

  render() {
    let {isVisible, onCancel, items, title, onSave} = this.props;
    return (
      <ListModal
        isVisible={isVisible}
        transparent={false}
        onBackdropPress={onCancel}
        title={title}
        onCancel={onCancel}
        onSave={onSave}>
        <FlatList
          data={items}
          style={styles.listContainer}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <Divider style={{marginVertical: 10}} />
          )}
          keyExtractor={(item, index) => `${index}`}
        />
      </ListModal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    margin: 5,
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 5,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  viewDetails: {
    flex: 1,
    fontSize: 18,
    color: colors.primary,
    fontWeight: '500',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
