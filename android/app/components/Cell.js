import React, { Component } from 'react';
import {View, Stylesheet, Text, TouchableOpacity, winPossibilities} from 'react-native';
import { EMPTY, CROSS, ROUND } from '../consts/Values';

export default Cell = (props) => {
    switch(props.state) {
        case EMPTY:
                return (
                <TouchableOpacity  style={props.style} onPress={props.onTouch}></TouchableOpacity>
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
                    <View style={props.style} >
                       <Text>0</Text> 
                    </View>
                )
            break;
            default:
                    return (
                        <TouchableOpacity onPress={props.onTouch}></TouchableOpacity>
                        )

    }
}