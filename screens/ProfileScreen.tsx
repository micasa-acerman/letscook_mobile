import React, { useEffect, useState } from 'react'
import { Image,  StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import REST from '../api'


interface ProfileItemType {
  key: string;
  title: string;
  icon: any;
  navigate: string;
  intent?: any;
}

export default function ProfileScreen({navigation}:{navigation:any}) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [avatar, setAvatar] = useState('')
  const [authorId, setAuthorId] = useState(0)
  useEffect(() => {
    REST.getMyInfo()
      .then((data) => {
        setName(data.nickname);
        setAvatar(data.simple_local_avatar.full);
        setRole(
          data.roles[0].charAt(0).toUpperCase() + data.roles[0].slice(1).toLowerCase()
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
      authorId
    }
  },
  {
    key: "messages",
    title: "My messages",
    icon: require("../assets/images/ic_messages.png"),
    navigate: "DialogsScreen",
  },
  {
    key: "followers",
    title: "Followers",
    icon: require("../assets/images/ic_followers.png"),
    navigate: "",
  },
  {
    key: "following",
    title: "Following",
    icon: require("../assets/images/ic_following.png"),
    navigate: "",
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
    navigate: "",
  },
];

  const ProfileItem = ({ item }: { item: ProfileItemType }) => {
    return (
      <>
        <TouchableHighlight
          style={styles.listTouchable}
          activeOpacity={0.8}
          underlayColor="#eaeaea"
          onPress={() => {
            if(item.intent)
              navigation.navigate(item.navigate, item.intent!);
            else
              navigation.navigate(item.navigate)
          }}
        >
          <View style={styles.listWrap}>
            <Image style={styles.listIcon} source={item.icon} />
            <Text style={styles.listText}>{item.title}</Text>
          </View>
        </TouchableHighlight>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: avatar }}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{ name }</Text>
          <Text style={styles.profileRole}>{ role }</Text>
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
    listIcon:{
        width: 18,
        height: 18,
        marginRight: 10
    },
    listWrap:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    listContainer:{
        marginTop: 20
    },
    listTouchable:{
        padding: 10
    },
    listText:{
        fontSize: 16,
        fontFamily: 'aqua', // aqua-medium
        color: '#828282'
    },
    container:{
        backgroundColor: '#fff',
        marginLeft: 12,
        marginRight: 12,
        marginTop: 18,
        padding: 12
    },
    avatar: {
        width: 82,
        height: 82,
        borderRadius: 41
    },
    profileInfo:{
        marginLeft: 14,
    },
    header:{
        flexDirection: 'row'
    },
    profileName:{
        fontSize: 20,
        color: '#000000',
        fontFamily: 'aqua',
        marginBottom: 2
    },
    profileRole:{
        fontSize: 14,
        color: '#868686',
        fontFamily: 'aqua',

    }
})