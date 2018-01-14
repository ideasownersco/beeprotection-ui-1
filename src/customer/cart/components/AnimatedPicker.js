import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  Picker,
  TouchableHighlight,
  View,
} from 'react-native';

import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

const deviceHeight = Dimensions.get('window').height;

class AnimatedPicker extends Component {
  componentDidMount() {
    Animated.timing(this.props.offset, {
      duration: 300,
      toValue: 100,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.props.offset, {
      duration: 300,
      toValue: deviceHeight,
    }).start(this.props.closeModal);
  };

  render() {
    const {items, onPress, activeItem} = this.props;
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight
          onPress={this.closeModal}
          underlayColor="transparent"
          style={styles.closeButton}>
          <Ionicons name="ios-close" size={30} color="black" />
        </TouchableHighlight>
        <Picker
          selectedValue={activeItem}
          onValueChange={item => onPress(item)}>
          {items.map(item => (
            <Picker.Item key={item} value={item} label={item} />
          ))}
        </Picker>
      </View>
    );
  }
}

AnimatedPicker.propTypes = {
  items: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
};
