import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Post from '../models/Post'

export default function PostComponent({post}:{post:Post}) {
    const media = post['_embedded']['wp:featuredmedia']
    // console.log(media)
    
    const imageSrc:string = media?media[0].media_details.sizes.medium_large.source_url:""
    const title:string = post.title.rendered
    return (
      <View style={styles.inner}>
        <Image style={styles.image} source={{ uri: imageSrc }} />
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
      </View>
    );
}

const styles = StyleSheet.create({
    inner:{
        flex: 1
    },
    image:{
        width: 164,
        height: 164
    },
    title:{
        color: '#676767',
        fontFamily: 'aqua',
        fontSize: 16,
        marginTop: 4
    },
})
