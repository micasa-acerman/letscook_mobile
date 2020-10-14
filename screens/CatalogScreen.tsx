import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import REST from "../api";
import Loading from "../components/Loading";
import Category from "../models/Category";

export default function CatalogScreen({ navigation }: { navigation: any }) {
  const [data, setData] = useState<Array<Category>>([]);
  const [load, setLoad] = useState(true);

  const renderItem = ({ item }: { item: Category }) => {
    if (item.category_image?.sizes.large)
      return (
        <View style={styles.renderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ShowRecipesScreen", {
                query: {
                  categories: item.id,
                },
                title: item.name
              });
            }}
          >
            <ImageBackground
              style={styles.renderBackground}
              source={{ uri: item.category_image?.sizes.large }}
            >
              <View style={styles.renderFilter}>
                <Text style={styles.renderText}>{item.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    else {
      return (
        <View style={styles.renderContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ShowRecipesScreen", {
                query: {
                  categories: item.id,
                },
                title: item.name
              });
            }}
          >
            <ImageBackground
              style={styles.renderBackground}
              source={require("../assets/images/_avatar2.png")}
            >
              <View style={styles.renderFilter}>
                <Text style={styles.renderText}>{item.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }
  };

  useEffect(() => {
    if (load)
      REST.getCategories()
        .then((categories) => {
          setData(categories);
          setLoad(false);
        })
        .catch((ex) => {});
  }, [load]);

  if (load) return <Loading />;
  else
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  renderContainer: {
    flex: 0.5,
    margin: 10,
  },
  renderBackground: {
    flex: 1,
    height: 180,
  },
  renderText: {
    color: "#fff",
    fontFamily: "aqua-medium",
    marginBottom: 4,
    marginRight: 4,
    fontSize: 16,
  },
  renderFilter: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,.3)",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
