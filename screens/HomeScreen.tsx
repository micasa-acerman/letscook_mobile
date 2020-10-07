import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Post, REST } from '../api';

import SliderPostsScreen from '../components/SliderPostsScreen';
import { Text, View } from '../components/Themed';

export default function TabHomeScreen() {
  const [data, setData] = React.useState<Array<Post>>([])
  React.useEffect(() => {
    REST.getPosts().then((payload)=>{
      setData(payload)
    })
  }, [])

  if(data.length){
    return (
      <View style={styles.container}>
    <SliderPostsScreen posts={data} title={"Title"} />
    </View>
    )
  }else{
    return (<Text>Loading...</Text>)
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginLeft: 12,
  },
});
