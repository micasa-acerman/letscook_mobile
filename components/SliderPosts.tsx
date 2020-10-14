import React from 'react'
import { Image, Slider, StyleSheet, Text, View } from 'react-native'
import { FlatList, ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import Post from '../models/Post'
import SliderData from '../models/SlideData'
import PostComponent from './PostComponent'
interface Params{
  data:SliderData,
  onPress:(post:Post)=>void
}
export default function SliderPosts({data,onPress}:Params) {
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
        <Text style={styles.category}>{data.name}</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={data.items}
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
    },
    category:{
        color: '#454545',
        fontFamily: 'aqua',
        fontSize: 20,
        marginBottom: 12
    }
})
