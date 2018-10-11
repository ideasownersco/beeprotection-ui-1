import React, {Component} from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Settings extends Component {
  // static navigationOptions = ({navigation}) => {
  //   return {
  //     headerLeft: (
  //       <TouchableHighlight
  //         underlayColor="transparent"
  //         onPress={() =>
  //           navigation.state.params &&
  //           navigation.state.params.handleLeftButtonPress()}>
  //         <FontAwesome name="bars" size={30} style={{padding: 10}} />
  //       </TouchableHighlight>
  //     ),
  //   };
  // };
  //
  // componentDidMount() {
  //   this.props.navigation.setParams({
  //     handleLeftButtonPress: this.toggleDrawer,
  //   });
  // }
  //
  // toggleDrawer = () => {
  //   this.props.navigation.openDrawer();
  // };

  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <Text
          style={{textAlign: 'center', fontSize: 40}}
          onPress={() => this.props.navigation.navigate('CreateOrder')}>
          Settings
        </Text>
      </View>
    );
  }
}
