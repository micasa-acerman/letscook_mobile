import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import REST from '../api';
import Loading from '../components/Loading';

import SliderPostsScreen from '../components/SliderPosts';
import { Text, View } from '../components/Themed';
import Post from '../models/Post';

export default function TabHomeScreen({navigation}:{navigation:any}) {
  const [data, setData] = React.useState<Array<Post>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    REST.getPosts().then((payload) => {
      setData(payload);
      setIsLoading(false)
    });
  }, []);

  if (isLoading) return <Loading />;
  else {
    if (data.length) {
      return (
        <ScrollView style={styles.container}>
          <SliderPostsScreen
            posts={data}
            title={"Recommended"}
            onPress={(post) => navigation.navigate("RecipeScreen", { post })}
          />
        </ScrollView>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginLeft: 12,
  },
});
