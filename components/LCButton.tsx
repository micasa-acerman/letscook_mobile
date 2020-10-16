import React from 'react'
import {  Button, StyleSheet,Text, TextStyle, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export enum ButtonStyle {
    Primary,
    Secondary,
    Link
}

interface ButtonProps {
    children?:string,
    type?:ButtonStyle,
    containerStyle?:ViewStyle,
    textStyle?:TextStyle,
    onClick?:()=>void
}

export default function LCButton({children="Button",type=ButtonStyle.Primary,textStyle,containerStyle,onClick=()=>{}}:ButtonProps) {
    switch (type) {
      case ButtonStyle.Primary:
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.containerPrimary, containerStyle]}
            onPress={onClick}
          >
            <Text style={[styles.text, textStyle]}>{children}</Text>
          </TouchableOpacity>
        );
      case ButtonStyle.Secondary:
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.containerSecondary, containerStyle]}
            onPress={onClick}
          >
            <Text style={[styles.text, styles.textSecondary, textStyle]}>
              {children}
            </Text>
          </TouchableOpacity>
        );
      case ButtonStyle.Link:
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.containerLink, containerStyle]}
            onPress={onClick}
          >
            <Text style={[styles.text, textStyle]}>{children}</Text>
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    containerPrimary:{
        backgroundColor: '#EB5757',
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerSecondary:{
        backgroundColor: "transparent",
        borderRadius: 20,
        borderWidth: 1,
        height:40,
        borderColor: '#EB5757',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerLink:{
        fontSize: 16,
        color: '#EAEAEA',
        alignItems: 'center'
    },
    text:{
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'aqua'
    },
    textSecondary:{
        color: '#EB5757'
    }
})