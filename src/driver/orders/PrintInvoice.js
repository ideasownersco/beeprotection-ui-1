/**
 * @flow
 */
import React, {Component} from 'react';
import {Text, View, WebView} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {WEB_URL} from 'utils/env';
import NavButton from "components/NavButton";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "assets/theme/colors";
import {ACTIONS as DRIVER_ACTIONS} from 'driver/common/actions';
import RNPrint from 'react-native-print';

class PrintInvoiceScene extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          orderID: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    order: {},
  };

  state = {
    invoiceURL:undefined,
    downloaded:false
  };

  onNavigationStateChange = navState => {
  };

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <View>
          <Text
            style={{
              position: 'absolute',
              left: 8,
              top: 3,
              fontWeight: '700',
              color: colors.maroon,
              fontSize: 15,
            }}>
            {navigation.state.params && navigation.state.params.cartItemsCount}
          </Text>
          <NavButton
            icon={
              <MaterialCommunityIcons
                name="printer"
                size={30}
                color={colors.white}
              />
            }
            onPress={() =>
              navigation.state.params &&
              navigation.state.params.handleRightButtonPress()
            }
          />
        </View>
      ),
    };
  };

  componentDidMount() {

    this.props.navigation.setParams({
      handleRightButtonPress: this.printInvoice,
    });

    console.log('this.props',this.props);

    if(this.props.navigation) {
      this.downloadInvoice();
    }

  }


  downloadInvoice = () => {

    this.setState({
      downloaded:false
    });

    return new Promise((resolve, reject) => {
      this.props.dispatch(DRIVER_ACTIONS.printInvoice({
          orderID:this.props.navigation.getParam('orderID'),
          resolve,
          reject
        })
      );
    })
      .then(res => {
        this.setState({
          downloaded:true,
          invoiceURL:res.url
        });
      })
      .catch(e => {});
  };


  printInvoice = () => {
    if(this.state.downloaded) {
      // RNPrint.
      RNPrint.print({ filePath: this.state.invoiceURL})
    }
  };

  // async printRemotePDF() {
  //   await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
  // }

  render() {

    let orderID = this.props.navigation.getParam('orderID');
    let url = `${WEB_URL}/orders/${orderID}/invoice`;

    console.log('this.state',this.state);
    return (
      <WebView
        source={{uri: url}}
        scalesPageToFit={false}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(PrintInvoiceScene);
