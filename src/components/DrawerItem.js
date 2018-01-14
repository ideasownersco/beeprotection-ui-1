/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import IconFactory from 'components/IconFactory';
import {StyleSheet, Text, View} from 'react-native';

export default class DrawerItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onItemPress: PropTypes.func.isRequired,
    active: PropTypes.bool,
    iconProps: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      size: PropTypes.number,
    }).isRequired,
    routeName: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.active !== this.props.active;
  }

  render() {
    const {title, onItemPress, active, routeName, iconProps} = this.props;
    return (
      <Touchable
        onPress={() => onItemPress(routeName)}
        background={Touchable.Ripple(colors.primary, false)}>
        <View style={styles.container}>
          <IconFactory
            color={active ? colors.primary : colors.fadedBlack}
            {...iconProps}
          />
          <Text style={[styles.itemTitle, active && styles.activeTitle]}>
            {title}
          </Text>
        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemTitle: {
    fontSize: 18,
    color: colors.fadedBlack,
    paddingHorizontal: 10,
    textAlign: 'left',
  },
  activeTitle: {
    color: colors.primary,
  },
});
