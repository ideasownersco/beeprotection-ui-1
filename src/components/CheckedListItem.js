/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import {Checkbox} from 'react-native-paper';
import ListItem from 'components/ListItem';

export default class CheckedListItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked;
  }

  render() {
    let {title, disabled, onPress, checked, style, description} = this.props;
    return (
      <Touchable onPress={onPress}>
        <View
          style={[styles.itemRowContainer, style, disabled && {opacity: 0.4}]}>
          <ListItem style={{flex: 1}} title={title} description={description} />
          <Checkbox checked={checked} color={colors.primary} />
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
