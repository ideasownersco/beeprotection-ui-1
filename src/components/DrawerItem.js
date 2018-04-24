/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconFactory from 'components/IconFactory';
import {DrawerItem as PaperDrawerItem} from 'react-native-paper';
import colors from 'assets/theme/colors';

export default class DrawerItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
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
    const {onItemPress, routeName, iconProps, ...rest} = this.props;
    return (
      <PaperDrawerItem
        {...rest}
        onPress={() => onItemPress(routeName)}
        icon={
          <IconFactory
            {...iconProps}
            color={this.props.active ? colors.secondary : colors.fadedBlack}
          />
        }
        color={this.props.active ? colors.secondary : colors.fadedBlack}
      />
    );
  }
}
