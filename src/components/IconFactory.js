/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

const components = {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
  Entypo,
  FontAwesome,
  Octicons,
};

class IconFactory extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.color !== this.props.color;
  }

  static defaultProps = {
    size: 24,
    color: 'rgba(0,0,0,0.87)',
  };

  render() {
    let {type, style, color, size, name} = this.props;
    const Icon = components[type];
    return (
      <Icon
        name={name}
        color={color}
        size={size}
        style={[{width: size, height: size}, style]}
      />
    );
  }
}

export default IconFactory;
