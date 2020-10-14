import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import PostComponent from '../components/PostComponent'
import Post from '../models/Post'
import REST from '../api'
export default function MyRecipesScreen({route,navigation}:{route:any,navigation:any}) {
  
    const [posts, setPosts] = useState<Array<Post>>([])

    useEffect(() => {
      if(route.params.title){
        console.log('TITLE',route.params.title);
        navigation.setOptions({ title: "XKTY" });
      }
      REST.getPosts(route.params.query)
        .then((posts) => setPosts(posts))
        .catch((ex) => console.log(ex))
    }, [])

    const onPress = (post:Post)=>{
        navigation.navigate('RecipeScreen',{post})
    }

    const renderItem = ({item}:{item:Post})=>{
        return (
          <View style={styles.renderContainer}>
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.8}
              onPress={() => onPress(item)}
            >
              <PostComponent post={item} />
            </TouchableHighlight>
          </View>
        );
    }
    return (
      <View style={styles.container}>
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          data={posts}
          keyExtractor={item => String(item.id)}
          onEndReached={() => console.log("end reach")}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    padding: 8,
    flex: 1,
    backgroundColor: '#fff'
  },
  
  renderContainer:{
    flex: 0.5,
    margin: 8
  }
})
