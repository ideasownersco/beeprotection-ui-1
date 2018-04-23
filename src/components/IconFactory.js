/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from 'assets/theme/colors';
import Octicons from 'react-native-vector-icons/Octicons';

const components = {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  Octicons,
  MaterialIcons,
};

class IconFactory extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  static defaultProps = {
    type: 'Ionicons',
    name: 'bug',
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.color !== this.props.color;
  }

  render() {
    let {type, name, ...rest} = this.props;
    const Icon = components[type];
    return <Icon color={colors.fadedGrey} size={30} name={name} {...rest} />;
  }
}

export default IconFactory;
