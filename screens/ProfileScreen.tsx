import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'


interface ProfileItemType {
    key: string,
    title: string,
    iconPath: string
}


const PROFILE_ITEMS:Array<ProfileItemType> = [
    {
        key:'recipes',
        title:'My recipes',
        iconPath:'none'
    },
    {
        key:'messages',
        title:'My messages',
        iconPath:'none'
    },
    {
        key:'followers',
        title:'Followers',
        iconPath:'none'
    },
    {
        key:'following',
        title:'Following',
        iconPath:'none'
    },
    {
        key:'about',
        title:'About',
        iconPath:'none'
    },
    {
        key:'logout',
        title:'Log out',
        iconPath:'none'
    }

] 
const ProfileItem = ({item}:{item:ProfileItemType})=>{
    return (
      <TouchableHighlight style={styles.listTouchable} activeOpacity={0.2} underlayColor="#f00">
        <Text style={styles.listText}>{item.title}</Text>
      </TouchableHighlight>
    );
  }


export default function ProfileScreen() {


    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Image style={styles.avatar} source={require('../assets/images/_avatar.png')} />
            <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Anastasia Taylor</Text>
                <Text style={styles.profileRole}>Moderator</Text>
            </View>
        </View>
        <View style={styles.listContainer}>
            <FlatList data={PROFILE_ITEMS} renderItem={ProfileItem} keyExtractor={item=>item.key} />
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer:{
        marginTop: 30
    },
    listTouchable:{
        padding: 10
    },
    listText:{
        fontSize: 16,
        fontFamily: 'aqua-medium',
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