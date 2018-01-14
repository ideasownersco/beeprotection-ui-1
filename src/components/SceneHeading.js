/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import {Text, View, StyleSheet} from 'react-native';
import I18n, {isRTL} from 'utils/locale';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SceneHeading = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{I18n.t('standing_orders')}</Text>

      <Touchable onPress={onPress}>
        <View style={styles.rightButtonGroup}>
          <Text style={styles.viewAll}>{I18n.t('view_all')}</Text>
          <MaterialIcons
            name={isRTL ? 'chevron-left' : 'chevron-right'}
            size={30}
            color={colors.primary}
          />
        </View>
      </Touchable>
    </View>
  );
};

SceneHeading.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 15,
    fontWeight: '500',
  },
  rightButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    paddingVertical: 10,
  },
});

export default SceneHeading;
