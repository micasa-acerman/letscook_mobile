import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';


interface TextFieldProps {
  icon:any,
  placeholder?:string,
  padding?:number,
  children?:string,
  onChangeText?:(text: string) => void
}

function TextField({icon,placeholder='Placeholder',padding=20,children='',onChangeText}:TextFieldProps) {
    return (
      <View style={{ paddingTop: padding, paddingBottom: padding }}>
        <View style={styles.formGroup}>
          <Image source={icon} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            underlineColorAndroid="transparent"
            value={children}
            onChangeText={onChangeText}
          ></TextInput>
        </View>
        <View style={styles.divider}></View>
      </View>
    );
}

const styles = StyleSheet.create({
  formGroup: {
    marginLeft: 4,
    flexDirection: "row",
    alignItems: "stretch",
    marginBottom: 8
  },
  icon: {
    width: 28,
    height: 28,
  },
  input: {
    marginLeft: 10,
    fontSize: 22,
    color: "#eaeaea",
    borderWidth: 0,
    fontFamily: 'aqua',
    alignSelf:"stretch"
  },
  divider: {
    height: 1,
    backgroundColor: "#D2D2D2",
  },
});

export default TextField
