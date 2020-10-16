import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function TextField({
  children="",
  onChangeText=()=>{},
  labelText="",
  secureTextEntry=false,
  placeholder=""
}: {
  children?: string,
  onChangeText?: (text: string) => void,
  labelText?:string,
  secureTextEntry?:boolean,
  placeholder?:string
}) {
  return (
    <View style={styles.container} >
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={children}
        placeholder={placeholder}
        onChangeText={onChangeText}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8
  },
  label: {
    fontSize: 16,
    fontFamily: 'aqua-medium',
    color: '#828282',
    marginBottom: 8
  },
  input: {
    padding: 10,
    color: "#828282",
    borderColor: '#e0e0e0',
    borderWidth: 1,
    
    borderRadius: 4,
  },
});
