/**
 * @flow
 */
import React, {PureComponent} from 'react';
import {ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ACTIONS} from 'customer/common/actions';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';

class BidList extends PureComponent {
  render() {
    return <ScrollView style={{flex: 1}} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators({...ACTIONS}, dispatch)};
}

function mapStateToProps(state) {
  return {
    isAuthenticated: USER_SELECTORS.isAuthenticated(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BidList);
