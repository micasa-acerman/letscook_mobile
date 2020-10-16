import React, { createRef, useLayoutEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TextInputProps, View } from "react-native";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";

interface ListViewParams {
  data: Array<string>;
  label?: string;
  onRemove?: (item: string) => void;
  onAdd?: (item: string) => void;
}

const EmptyContainerTemplate = ()=>{
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems:"center",
      height: 40,
      backgroundColor:"rgba(240,240,240,.5)",
    },
    text: {
      color: "#828282",
    },
  });
  return (<View style={styles.container}>
    <Text style={styles.text}>No items</Text>
  </View>)
}

export default function ListView({
  data,
  label = "",
  onRemove = () => {},
  onAdd = () => {},
}: ListViewParams) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");
  const refInput = useRef<TextInput>(null);
  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={renderItemStyles.container}>
        <Text style={renderItemStyles.text}>{item}</Text>
        <TouchableOpacity
          style={renderItemStyles.action}
          onPress={() => onRemove(item)}
        >
          <Ionicons size={24} name="ios-remove" color="#4f4f4f" />
        </TouchableOpacity>
      </View>
    );
  };
  useLayoutEffect(() => {
    if (editing) refInput.current.focus();
  }, [editing]);
  const onEndEditing = () => {
    if (input.length) onAdd(input);
    setInput("");

    setEditing(false);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.addActionContent}
          onPress={() => {
            setEditing(true);
          }}
        >
          <Ionicons
            size={18}
            name={editing ? "ios-brush" : "ios-add"}
            style={styles.addAction}
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={editing ? styles.input : styles.hidden}
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={onEndEditing}
        ref={refInput}
      />
      {data.length || editing?<FlatList data={data} keyExtractor={(it) => it} renderItem={renderItem}  />:<EmptyContainerTemplate/>}
    </View>
  );
}
const renderItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
  },
  action: {
    width: 24,
    height: 24,
    alignItems: "center",
  },
  text: {
    color: "#828282",
  },
});

const styles = StyleSheet.create({
  hidden: {
    height: 0,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addActionContent: {
    backgroundColor: "#EB5757",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  addAction: {
    color: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  wrapper: {
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: "aqua-medium",
    color: "#828282",
    marginBottom: 8,
  },
});
