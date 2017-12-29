import { View } from 'react-native';
import React from 'react';
export const Circle = (props) =>{
    const { size, borderColor, top, borderWidth } = props;
    return(
        <View style={{
            borderWidth: borderWidth,
            borderColor: borderColor,
            top: -top,
            height: size,
            width: size,
            borderRadius: size/2,
        }}
        >
        </View>
    )
}