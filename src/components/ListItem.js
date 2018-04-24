/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ListItem as PaperListItem} from 'react-native-paper';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';

export default class ListItem extends Component {
  static propTypes = {
    onItemPress: PropTypes.func,
    name: PropTypes.string,
    title: PropTypes.string.isRequired,
    iconProps: PropTypes.object,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {
      onItemPress,
      name,
      title,
      iconProps,
      description,
      style,
      ...rest
    } = this.props;
    return (
      <PaperListItem
        onPress={name ? () => onItemPress(name) : onItemPress}
        icon={iconProps ? <IconFactory {...iconProps} /> : null}
        title={title}
        description={description}
        inset={true}
        style={style}
        {...rest}
      />
    );
  }
}
