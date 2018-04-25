/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import IconFactory from 'components/IconFactory';

const SectionTitle = ({titleStyle, title, style, icon, iconType, iconSize}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <IconFactory
          type={iconType}
          name={icon}
          color={colors.primary}
          size={iconSize}
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
    // paddingHorizontal: 5,
  },
});
export default SectionTitle;
