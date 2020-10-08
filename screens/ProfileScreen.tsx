import React from 'react'
import { Image, ImageProps, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native-gesture-handler'


interface ProfileItemType {
    key: string,
    title: string,
    icon: any,
    navigate: string
}



export default function ProfileScreen({navigation}:{navigation:any}) {
    
const PROFILE_ITEMS: Array<ProfileItemType> = [
  {
    key: "recipes",
    title: "My recipes",
    icon: require("../assets/images/ic_recipes.png"),
    navigate: "",
  },
  {
      key:'messages',
      title:'My messages',
      icon:require('../assets/images/ic_messages.png'),
      navigate: ''
  },
  {
      key:'followers',
      title:'Followers',
      icon:require('../assets/images/ic_followers.png'),
      navigate: ''
  },
  {
      key:'following',
      title:'Following',
      icon:require('../assets/images/ic_following.png'),
      navigate: ''
  },
  {
      key:'about',
      title:'About',
      icon:require('../assets/images/ic_info.png'),
      navigate: 'AboutScreen'
  },
  {
      key:'logout',
      title:'Log out',
      icon:require('../assets/images/ic_logout.png'),
      navigate: ''
  }
]; 

    const ProfileItem = ({item}:{item:ProfileItemType})=>{
      return (
        <>
          <TouchableHighlight
            style={styles.listTouchable}
            activeOpacity={0.8} 
            underlayColor="#eaeaea"
            onPress={() => {
              navigation.navigate(item.navigate);
            }}
          >
            <View style={styles.listWrap}>
              <Image style={styles.listIcon} source={item.icon} />
              <Text style={styles.listText}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        </>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={require("../assets/images/_avatar.png")}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Anastasia Taylor</Text>
            <Text style={styles.profileRole}>Moderator</Text>
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
        marginTop: 30
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
        height: 82
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
        marginBottom: 4
    },
    profileRole:{
        fontSize: 14,
        color: '#868686',
        fontFamily: 'aqua',

    }
})