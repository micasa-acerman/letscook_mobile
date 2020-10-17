import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { BackHandler, Image, StyleSheet, Text, ToastAndroid, View } from "react-native";
import { FlatList, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import REST from "../api";
import Loading from "../components/Loading";
import ProfileItemType from "../models/ProfileItemType";
import User from "../models/User";
import {CapalizeString} from '../constants/Common'



export default function ProfileScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<User>()
  const [load, setLoad] = useState(true)

  useEffect(() => {
    if(load){
    REST.getMyInfo()
      .then((payload) => {
        setUser(payload)
        setLoad(false)
      })
      .catch((e) => {
        AsyncStorage.clear().then(()=>{
          navigation.popToTop()
        })
        console.error(e)
      });
    }
  }, [load]);
  const PROFILE_ITEMS: Array<ProfileItemType> = [
    {
      key: "recipes",
      title: "My recipes",
      icon: require("../assets/images/ic_recipes.png"),
      navigate: "MyRecipesScreen",
      intent: {
        query: {
          author: user?.id,
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
        onPress={async () => {
          setLoad(true)
          if (item.logout) {
            await AsyncStorage.clear()
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
  if(load)
    return (<Loading />)
  else
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.header} onPress={()=>navigation.navigate('ProfileSettingScreen',{user,setLoad})}>
          
          <Image style={styles.avatar} source={{ uri: user?.simple_local_avatar.full }} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1} lineBreakMode={'clip'}>{user?.name ?? 'Unkown'}</Text>
            <Text style={styles.profileRole}>{CapalizeString(user?.roles[0] ?? 'User')}</Text>
          </View>
        </TouchableOpacity>
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
    paddingLeft: 20,
  },
  listText: {
    fontSize: 18,
    fontFamily: "aqua",
    color: "#828282",
  },
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
  },
  profileInfo: {
    marginLeft: 12,
    marginRight: 12,
  },
  header: {
    flexDirection: "row",
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    color: "#000000",
    fontFamily: "aqua",
    marginBottom: 2,
    marginRight: 20
  },
  profileRole: {
    fontSize: 14,
    color: "#868686",
    fontFamily: "aqua",
  },
});
