import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { Post } from '../api'

export default function SliderPostsScreen({posts,title,onPress}:{posts:Array<Post>,title:string,onPress:(post:Post)=>void}) {
    const renderItem = ({item}:{item:Post})=>{
        const media = item['_embedded']['wp:featuredmedia']
        const imageSrc:string = media?media[0].media_details.sizes.medium_large.source_url:""
        const title:string = item.title.rendered
        return (
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={0.8}
            style={styles.inner}
            onPress={()=>onPress(item)}
          >
            <View>
              <Image style={styles.image} source={{ uri: imageSrc }} />
              <Text style={styles.title} numberOfLines={3}>
                {title}
              </Text>
            </View>
          </TouchableHighlight>
        );
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.category}>{title}</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={posts}
          renderItem={renderItem}
          keyExtractor={(p) => String(p.id)}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    inner:{
        width: 164,
        marginRight: 10
    },
    image:{
        width: 164,
        height: 164
    },
    container:{
        marginTop: 22,
        marginBottom: 22,
    },
    title:{
        color: '#676767',
        fontFamily: 'aqua',
        fontSize: 16,
    },
    category:{
        color: '#454545',
        fontFamily: 'aqua',
        fontSize: 20,
        marginBottom: 12
    }
})
