/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';

export default class DrawerIcon extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {onPress} = this.props;
    return (
      <Touchable
        onPress={onPress}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
        <FontAwesome
          name="bars"
          size={28}
          style={{paddingLeft: 10}}
          color={colors.primary}
        />
      </Touchable>
    );
  }
}
