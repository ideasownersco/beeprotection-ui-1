import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';
import List from "../../../components/List";

export default class SelectArea extends Component {

  static propTypes = {
    area_id: PropTypes.number,
    setArea: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
  };

  state = {
    isAreaListModalVisible: false,
  };

  shouldComponentUpdate(nextProps, prevState) {
    return nextProps.items !== this.props.items ||
      nextProps.area_id !== this.props.area_id ||
      prevState.isAreaListModalVisible !== this.state.isAreaListModalVisible
  }

  setArea = area => {
    this.props.setArea(area);
  };

  showAreaModal = () => {
    this.setState({
      isAreaListModalVisible: true,
    });
  };

  hideAreaListModal = () => {
    this.setState({
      isAreaListModalVisible: false,
    });
  };

  render() {

    let {area_id, items} = this.props;
    let {isAreaListModalVisible} = this.state;

    return (
      <Touchable
        style={{}}
        onPress={this.showAreaModal}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: 'black',
            }}>
            {area_id
              ? items.find(area => area.id === area_id).name
              : I18n.t('select_area')}
          </Text>

          <List
            title={I18n.t('select_area')}
            activeIDs={[area_id]}
            isVisible={isAreaListModalVisible}
            onConfirm={this.setArea}
            onCancel={this.hideAreaListModal}
            onSave={this.hideAreaListModal}
            items={items}
          />

        </View>
      </Touchable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
