import React from 'react'
import {  Button, StyleSheet,Text, TextStyle, ViewStyle } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

export enum ButtonStyle {
    Primary,
    Secondary,
    Link
}

interface ButtonProps {
    children:string,
    type?:ButtonStyle,
    containerStyle?:ViewStyle,
    textStyle?:TextStyle,
    onClick?:Function
}
export default function LCButton({children="Button",type=ButtonStyle.Primary,textStyle,containerStyle,onClick=Function()}:ButtonProps) {
    switch(type){
        case ButtonStyle.Primary:
            return (
                <TouchableHighlight underlayColor="#F47E7E" activeOpacity={0.8} style={[styles.Primary,containerStyle]} onPress={onClick}>
                    <Text style={[styles.text,textStyle]}>{children}</Text>
                </TouchableHighlight>
            )
        case ButtonStyle.Secondary:
            return (
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.8} style={[styles.Secondary,containerStyle]} onPress={onClick}>
                    <Text style={[styles.text,textStyle]}>{children}</Text>
                </TouchableHighlight>
            )
        case ButtonStyle.Link:
            return (
                <TouchableHighlight underlayColor="transparent" activeOpacity={0.8} style={[styles.Link,containerStyle]} onPress={onClick}>
                    <Text style={[styles.text,textStyle]}>{children}</Text>
                </TouchableHighlight>
            )
    }
}

const styles = StyleSheet.create({
    Primary:{
        backgroundColor: '#EB5757',
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Secondary:{
        backgroundColor: "transparent"
    },
    Link:{
        fontSize: 16,
        color: '#EAEAEA',
        alignItems: 'center'
    },
    text:{
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'aqua'
    }
})