import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import { Category } from '../api';



export default function TagList({tags}:{tags:Array<Category>}) {
    const Tag = ({item}: {item:Category})=>{
        return (
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={0.8}
            style={styles.tagContainer}
            onPress={()=>{}}
          >
            <Text style={styles.tagText}>{item.name}</Text>
          </TouchableHighlight>
        );
    }
    return (
      <FlatList
        style={styles.list}
        data={tags}
        renderItem={Tag}
        keyExtractor={(tag) => String(tag.id)}
        horizontal={true}
      ></FlatList>
    );
}

const styles = StyleSheet.create({
    list:{
        marginTop: 10,
        marginBottom: 10
    },
    tagContainer:{
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 4,
        paddingBottom: 4,
        marginRight: 4,
        borderRadius: 25,
        backgroundColor: '#FDEEEE'
    },
    tagText:{
        color: '#EB5757',
        fontFamily: 'aqua',
        fontSize: 12
    }
})
