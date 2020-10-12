import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import Post from '../models/Post'
import PostComponent from './PostComponent'

export default function SliderPosts({posts,title,onPress}:{posts:Array<Post>,title:string,onPress:(post:Post)=>void}) {
    const renderItem = ({item}:{item:Post})=>{
        return (
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={0.8}
            style={styles.inner}
            onPress={()=>onPress(item)}
          >
            <PostComponent post={item} />
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
    category:{
        color: '#454545',
        fontFamily: 'aqua',
        fontSize: 20,
        marginBottom: 12
    }
})
