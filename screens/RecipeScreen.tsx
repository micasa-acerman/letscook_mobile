import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AutoHeightWebView from "react-native-autoheight-webview";
import TagList from "../components/TagList";
import Category from "../models/Category";
import Post from "../models/Post";

const jsInject = `
    document.addEventListener('DOMContentLoaded',()=>{
      window.postMessage(document.documentElement.scrollHeight)
    });
    true;
    `;

export default function RecipeScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {


  const { post }: { post: Post } = route.params;
  const media = post["_embedded"]["wp:featuredmedia"];
  const imageSrc: string = media
    ? media[0].media_details.sizes.medium_large.source_url
    : "";
  const content = `
      ${post.content.rendered}`;
  const author = post["_embedded"]["author"][0];
  const authorAvatar = author.simple_local_avatar["96"];
  const categories: Array<Category> = post["_embedded"]["wp:term"][0];

  useEffect(()=>{
    navigation.setOptions({ title: post.title.rendered });
  },[])

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Image source={{ uri: imageSrc }} style={styles.image} />
      <View style={styles.contentWrap}>
        <Text style={styles.recipeName} numberOfLines={2}>
          {post.title.rendered}
        </Text>
        <View>
          <TagList tags={categories} onSelect={(item)=>{
            navigation.navigate("ShowRecipesScreen", {
              query: {
                categories: item.id,
              },
              title: item.name
            });
          }} />
          <TouchableWithoutFeedback
            onPress={() => {
              //navigation.navigate("ProfileInfoScreen", { user_id: author.id });
            }}
          >
            <View style={styles.author}>
              <Image source={{ uri: authorAvatar }} style={styles.avatar} />
              <Text style={styles.authorName}>{author.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <AutoHeightWebView
          style={{ width: Dimensions.get("window").width - 15, marginTop: 10 }}
          customStyle={`
          * {
            line-height: 1.5;
            user-select: none
          }
          h2{
            font-size: 18
          }
          ul,li,ol{
            margin-left:10;
            padding:0;
          }
        `}
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
          bounces={false}
          scrollEnabled={false}
          scrollEnabledWithZoomedin={false}
          scalesPageToFit={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  author: {
    flexDirection: "row",
    alignItems: "center",
  },
  authorName: {
    color: "#858585",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  scroll: {
    flexGrow: 1,
  },
  image: {
    height: 240,
  },
  contentWrap: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    backgroundColor: "#fff",
    marginTop: -20,
    flex: 1,
  },
  recipeName: {
    fontSize: 24,
    fontFamily: "aqua",
    color: "#000",
  },
});
