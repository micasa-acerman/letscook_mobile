import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { BackHandler, Image, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import REST from "../api";
import ProfileItemType from "../models/ProfileItemType";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [avatar, setAvatar] = useState("");
  const [authorId, setAuthorId] = useState(0);
  useEffect(() => {
    REST.getMyInfo()
      .then((data) => {
        setName(data.nickname);
        setAvatar(data.simple_local_avatar.full);
        setRole(
          data.roles[0].charAt(0).toUpperCase() +
            data.roles[0].slice(1).toLowerCase()
        );
        setAuthorId(data.id);
      })
      .catch((e) => console.error(e));
  }, []);
  const PROFILE_ITEMS: Array<ProfileItemType> = [
    {
      key: "recipes",
      title: "My recipes",
      icon: require("../assets/images/ic_recipes.png"),
      navigate: "MyRecipesScreen",
      intent: {
        query: {
          author: authorId,
        },
      },
    },
    {
      key: "messages",
      title: "My messages",
      icon: require("../assets/images/ic_messages.png"),
      navigate: "DialogsScreen",
    },
    {
      key: "about",
      title: "About",
      icon: require("../assets/images/ic_info.png"),
      navigate: "AboutScreen",
    },
    {
      key: "logout",
      title: "Log out",
      icon: require("../assets/images/ic_logout.png"),
      navigate: "SignInScreen",
      logout: true,
    },
  ];

  const ProfileItem = ({ item }: { item: ProfileItemType }) => {
    return (
      <TouchableHighlight
        style={styles.listTouchable}
        activeOpacity={0.8}
        underlayColor="#eaeaea"
        onPress={() => {
          if (item.logout) {
            navigation.popToTop()
          } else {
            if (item.intent) navigation.navigate(item.navigate, item.intent!);
            else navigation.navigate(item.navigate);
          }
        }}
      >
        <View style={styles.listWrap}>
          <Image style={styles.listIcon} source={item.icon} />
          <Text style={styles.listText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: avatar }} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{name}</Text>
          <Text style={styles.profileRole}>{role}</Text>
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={PROFILE_ITEMS}
          renderItem={ProfileItem}
          keyExtractor={(item) => item.title}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listIcon: {
    width: 22,
    height: 22,
    marginRight: 14,
  },
  listWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    marginTop: 20,
  },
  listTouchable: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 4,
  },
  listText: {
    fontSize: 18,
    fontFamily: "aqua",
    color: "#828282",
  },
  container: {
    backgroundColor: "#fff",
    marginLeft: 12,
    marginRight: 12,
    marginTop: 18,
    padding: 12,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  profileInfo: {
    marginLeft: 14,
  },
  header: {
    flexDirection: "row",
  },
  profileName: {
    fontSize: 20,
    color: "#000000",
    fontFamily: "aqua",
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    color: "#868686",
    fontFamily: "aqua",
  },
});
