import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import LCButton, { ButtonStyle } from '../components/LCButton'
import Loading from '../components/Loading'

interface ProfileInfo {
    icon:any,
    text:string,
    capacity:number
}

const renderProfileInfo = ({item}:{item:ProfileInfo})=>{
    return (
      <View style={renderItemStyles.container}>
        <Image style={renderItemStyles.icon} source={item.icon} />
        <Text style={renderItemStyles.text}>{item.text}</Text>
        <Text style={renderItemStyles.capacity}>{item.capacity}</Text>
      </View>
    );
}

export default function ProfileInfoScreen({user_id}:{user_id:number}) {
    const [metrics, setMetrics] = useState({
        followers: 0,
        following: 0,
        recipes: 0
    })
    const [load, setLoad] = useState(false)
    const info:Array<ProfileInfo> = [
        {
            icon: require('../assets/images/ic_followers.png'),
            capacity: metrics.followers,
            text: 'Followers'
        },
        {
            icon: require('../assets/images/ic_following.png'),
            capacity: metrics.following,
            text: 'Following'
        },
        {
            icon: require('../assets/images/ic_recipes.png'),
            capacity: metrics.recipes,
            text: 'Recipes'
        }
    ]

    useEffect(() => {
      
    }, [])


    // navigation.setOptions({ title: title });
    if(load){
      return (<Loading />)
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <Image style={styles.avatar} resizeMode={'cover'} source={require("../assets/images/_avatar2.png")} />
          <View style={styles.inner}>
            <FlatList
              columnWrapperStyle={styles.listWrap}
              data={info}
              numColumns={3}
              keyExtractor={(it) => it.text}
              renderItem={renderProfileInfo}
            />
            <Text style={styles.content}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Accusantium ducimus laudantium totam architecto. Nam velit itaque
              aliquid fuga nihil, ratione ex veritatis temporibus dolorum beatae
              eos ipsum. Possimus, rem sunt!
            </Text>
          </View>
        </ScrollView>
        <View style={styles.stickyBottom}>
          <LCButton containerStyle={styles.action} type={ButtonStyle.Primary}>Follow</LCButton>
          <LCButton containerStyle={styles.action} type={ButtonStyle.Secondary}>Message</LCButton>
        </View>
      </View>
    );
}

const renderItemStyles = StyleSheet.create({
  container:{
      marginLeft: 16,
      marginRight: 16,
      alignItems:"center"
  },
  text:{
    color: '#828282',
    fontFamily: 'aqua-medium'
  },
  icon:{
    width: 36,
    height: 36
  },
  capacity:{
    color: '#bdbdbd',
    fontSize: 16,
    fontFamily: 'aqua'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
  },
  avatar: {
    height: 260,
  },
  content: {
    marginTop: 14,
    color: '#7C7C7C',
    fontFamily: 'aqua',
    fontSize: 16
  },
  inner: {
    marginTop: -20,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 20,
  },
  listWrap: {
    flex: 1,
    justifyContent: "space-around",
  },
  stickyBottom: {
    flexDirection: "row",
    padding: 14,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 20,
  },
  action: {
    paddingTop: 4,
    paddingBottom: 4,
    width: 140,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 10,
  },
});
