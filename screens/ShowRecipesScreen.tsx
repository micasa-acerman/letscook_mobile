import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import PostComponent from '../components/PostComponent'
import Post from '../models/Post'
import REST from '../api'
import Loading from '../components/Loading'
import { Ionicons } from '@expo/vector-icons'
export default function MyRecipesScreen({route,navigation}:{route:any,navigation:any}) {
    const [load, setLoad] = useState(true)
    const [posts, setPosts] = useState<Array<Post>>([])



  useLayoutEffect(() => {
    if(route.params.title){
      navigation.setOptions({ title: route.params.title });
    }
    navigation.setOptions({headerRight: () => (
      <TouchableWithoutFeedback onPress={()=>{navigation.navigate('CreateRecipeScreen')}} style={{ marginRight: 20 }}>
        <Ionicons size={30}  name='ios-add' color='#000' />
      </TouchableWithoutFeedback>
    )})
  }, [])

    useEffect(() => {
      REST.getPosts(route.params.query)
        .then((posts) => {
          setPosts(posts)
          setLoad(false) 
        })
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
    if (load) return <Loading />;
    else
      return (
        <View style={styles.container}>
          <FlatList
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            data={posts}
            keyExtractor={(item) => String(item.id)}
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
