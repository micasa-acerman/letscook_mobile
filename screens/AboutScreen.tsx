import React from 'react'
import { View, Text, StyleSheet, Image, Linking } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import LCButton from '../components/LCButton'

interface SocialItem {
    ref: string,
    icon: any,
}

const SOCIAL_ITEMS:Array<SocialItem> = [
    {
        icon: require('../assets/images/ic_vk.png'),
        ref:'https://vk.com/'
    },
    {
        icon:require('../assets/images/ic_fb.png'),
        ref:'https://fb.com'
    },
    {
        icon:require('../assets/images/ic_inst.png'),
        ref:'https://instagram.com'
    },
]

const AboutScreen = () => {
    return (
      <View style={styles.container}>
        <View style={styles.about}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.appLogo}
          />
          <Text style={styles.appName}>Let’s Cook</Text>
          <Text style={styles.appVersion}>version 1.12</Text>
          <View style={styles.socialGroup}>
            {SOCIAL_ITEMS.map((item: SocialItem, index: number) => (
              <TouchableHighlight
              underlayColor='transparent'
                style={index == 0 ? null : styles.socialSpace}
                activeOpacity={0.8}
                key={item.ref}
                onPress={() => {
                  Linking.openURL(item.ref);
                }}
              >
                <Image style={styles.socialImage} source={item.icon} />
              </TouchableHighlight>
            ))}
          </View>
        </View>
        <LCButton>Open source licenses</LCButton>
      </View>
    );
}
const styles = StyleSheet.create({
    appName: {
        fontSize: 30,
        fontFamily: 'obla'
    },
    about:{
      flex: 1,
      alignItems:"center",
      justifyContent:"center"  
    },
    appLogo:{
        width: 120,
        height: 120
    },
    appVersion:{
        fontSize: 18,
        fontFamily: 'aqua',
        color: '#979797'
    },
    socialGroup:{
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: "row",
    },
    socialSpace: {
        marginLeft: 15
    },
    socialImage: {
        width: 30,
        height: 30
    },
    container: {
        flex: 1,
        alignItems: "stretch",
        padding: 12
    }
})
export default AboutScreen
