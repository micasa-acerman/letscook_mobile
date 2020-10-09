import React, { useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Post } from '../api'


const jsInject = `
document.addEventListener('DOMContentLoaded',()=>{
  window.postMessage(document.documentElement.scrollHeight)
});
true;
`

export default function RecipeScreen({route,navigation}:{route:any,navigation:any}) {
  console.log('Recipe');
  
  const [contentHeight, setContentHeight] = useState(0)
  const { post }: { post: Post } = route.params;
  const media = post["_embedded"]["wp:featuredmedia"];
  const imageSrc: string = media
    ? media[0].media_details.sizes.large.source_url
    : "";
  const content = `
      ${post.content.rendered}`;
  const author = post["_embedded"]['author'][0]
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <View style={styles.contentWrap}>
        <Text style={styles.recipeName} numberOfLines={2}>
          {post.title.rendered}
        </Text>
        <View>
          <TouchableWithoutFeedback
          onPress={()=>{
            console.log('Hwlwoeqw');
            
          }}>
          <Text>{author.name}</Text>
          </TouchableWithoutFeedback>
        </View>
        <AutoHeightWebView
          style={{ width: Dimensions.get("window").width - 15, marginTop: 10 }}
          customStyle={`
          * {
            font-family: 'Times New Roman';
            line-height: 1.5;
          }
          h2{
            font-size: 18
          }
          ul,li,ol{
            margin-left:10;
            padding:0;
          }
        `}
          onSizeUpdated={(size) => console.log(size.height)}
          files={[
            {
              href: "cssfileaddress",
              type: "text/css",
              rel: "stylesheet",
            },
          ]}
          source={{
            html: content,
          }}
          scalesPageToFit={false}
          viewportContent={"width=device-width, user-scalable=no"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scroll:{
      flexGrow: 1,
    },
    image:{
        height: 240
    },
    contentWrap:{
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 30,
        backgroundColor: '#fff',
        marginTop: -20,
        flex: 1
    },
    recipeName:{
        fontSize: 24,
        fontFamily: 'aqua',
        color: "#000",
        
    }
})
