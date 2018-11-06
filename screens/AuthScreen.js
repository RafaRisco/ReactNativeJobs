import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/';

class AuthScreen extends Component {
  componentDidMount() {
    console.log('AuthScreen ' + this.state);
    this.props.facebookLogin();
    this.onAuthcComplete(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onAuthcComplete(nextProps);
  }

  onAuthcComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    );
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
