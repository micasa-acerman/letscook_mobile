import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import REST from '../api';
import Loading from '../components/Loading';

import SliderPostsScreen from '../components/SliderPosts';
import Post from '../models/Post';
import SliderData from '../models/SlideData';

export default function TabHomeScreen({navigation}:{navigation:any}) {
  const [data, setData] = React.useState<Array<SliderData>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    REST.getTags()
      .then(tags=>{
        return Promise.all(tags.map(async tag=>{
          let posts = await REST.getPosts({
            tags: tag.id
          })
          return {
            name:tag.name,
            items:posts
          }
        }))
    }).then(payload=>{
      setData(payload);
      setIsLoading(false)
    })
  }, []);

  if (isLoading) return <Loading />;
  else {
    if (data.length) {
      return (
        <ScrollView style={styles.container}>
          {data.map((it) => (
            <SliderPostsScreen
              key={it.name}
              data={it}
              onPress={(post) => navigation.navigate("RecipeScreen", { post })}
            />
          ))}
        </ScrollView>
      );
    } else {
      return <Loading />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginLeft: 12,
  },
});
