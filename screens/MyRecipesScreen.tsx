import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'
import PostComponent from '../components/PostComponent'
import Post from '../models/Post'
import REST from '../api'
import { View } from '../components/Themed'
export default function MyRecipesScreen({route,navigation}:{route:any,navigation:any}) {
    const { authorId }: { authorId: string } = route.params;
    const [posts, setPosts] = useState<Array<Post>>([])

    useEffect(() => {
      REST.getPosts(authorId)
        .then((posts) => setPosts(posts))
        .catch((ex) => console.log(ex))
    }, [])

    const onPress = (post:Post)=>{
        navigation.navigate('RecipeScreen',{post})
    }

    const renderItem = ({item}:{item:Post})=>{
        return (
          <TouchableHighlight
            underlayColor="transparent"
            activeOpacity={0.8}
            onPress={() => onPress(item)}
            style={styles.item}
          >
            <PostComponent post={item} />
          </TouchableHighlight>
        );
    }
    return (
      <>
      </>
    )
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
    alignItems:"center",
  },
  item:{
    marginBottom: 10
  }
})
