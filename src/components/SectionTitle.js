/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {Text, View, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import IconFactory from './IconFactory';

const SectionTitle = ({
  titleStyle,
  title,
  style,
  icon,
  iconType,
  iconSize,
  iconStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <IconFactory
          type={iconType ? iconType : 'MaterialIcons'}
          name={icon}
          color={colors.primary}
          style={[styles.icon, iconStyle]}
          size={iconSize ? iconSize : 25}
        />
      )}
      <Title style={[styles.title, {color: colors.darkGrey}, titleStyle]}>
        {title}
      </Title>
    </View>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    paddingHorizontal:5
  },
  icon: {
    height: 25,
    width: 25,
  },
});
export default SectionTitle;
