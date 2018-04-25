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
import Touchable from 'react-native-platform-touchable';

const TrackItem = ({
  title,
  onPress,
  description,
  iconBackground,
  iconProps,
  style,
}) => {
  return (
    <Touchable onPress={onPress}>
      <View style={[styles.container, style]}>
        <View style={[styles.iconContainer, {backgroundColor: iconBackground}]}>
          {<IconFactory {...iconProps} />}
        </View>
        <View style={styles.contentContainerStyle}>
          <SectionTitle title={title} style={styles.title} />
          {description && typeof description === 'string' ? (
            <Text style={styles.description}>{description}</Text>
          ) : (
            description
          )}
        </View>
      </View>
    </Touchable>
  );
};

TrackItem.propTypes = {
  iconProps: PropTypes.object,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
