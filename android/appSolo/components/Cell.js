import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { EMPTY, CROSS, ROUND } from '../consts/values';

export default Cell = (props) => {
  switch(props.state) {
    case EMPTY:
      return (
        <TouchableOpacity style={props.style} onPress={props.onTouch}></TouchableOpacity>
      )
    break;
    case CROSS:
      return (
        <View style={props.style}>
          <Text>X</Text>
        </View>
      )
    break;
    case ROUND:
      return (
        <View style={props.style}>
          <Text>O</Text>
        </View>
      )  
    break;
    default:
      return (
        <TouchableOpacity style={props.style} onPress={props.onTouch}></TouchableOpacity>
      )  
  }
}