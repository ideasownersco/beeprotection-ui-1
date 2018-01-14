/**
 * @flow
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import SectionTitle from 'components/SectionTitle';
import IconFactory from 'components/IconFactory';

const TrackItem = ({title, description, icon, style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.contentContainerStyle}>
        <SectionTitle title={title} style={styles.title} />
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
    </View>
  );
};

TrackItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  description: {
    fontSize: 18,
    color: colors.mediumGrey,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.mediumGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainerActive: {
    backgroundColor: colors.primary,
  },
  iconColorActive: {},
  title: {},
  contentContainerStyle: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default TrackItem;
