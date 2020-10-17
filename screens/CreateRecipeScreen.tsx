import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import TextField from "../components/TextField";
import * as ImagePicker from "expo-image-picker";
import LCButton from "../components/LCButton";
import ListView from "../components/ListView";
import Recipe from "../models/Recipe";
import { ALLOW_MEDIA_EXTENSIONS } from "../constants/Common";

export default function CreateRecipeScreen({navigation}:{navigation:any}) {
  const [recipe, setRecipe] = useState<Recipe>({
    name: "",
    image_uri: "",
    ingredients: [],
    directions: [],
    category_id: 0
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    const extension = result.uri.match(/.(\w+)$/g)[0]
    if(!ALLOW_MEDIA_EXTENSIONS.includes(extension)){
      Alert.alert('Alert','This media extension not support')
      return
    }
    if (!result.cancelled) {
      setRecipe({ ...recipe, image_uri: result.uri });
    }
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          <Image
            source={
              recipe.image_uri
                ? { uri: recipe.image_uri }
                : require("../assets/images/photo_upload.png")
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <TextField
          labelText={"Name"}
          placeholder="Recipe name"
          onChangeText={(name) => setRecipe({ ...recipe, name })}
        >
          {recipe.name}
        </TextField>
        <ListView
          label="Ingedients"
          data={recipe.ingredients}
          onAdd={(item) => {
            if (!recipe.ingredients.includes(item))
              setRecipe({
                ...recipe,
                ingredients: [item, ...recipe.ingredients],
              });
          }}
          onRemove={(item) => {
            const filtered = recipe.ingredients.filter((it) => it != item);
            setRecipe({ ...recipe, ingredients: filtered });
          }}
        />
        <LCButton containerStyle={styles.action} onClick={() => {
          if(!recipe.image_uri.length){
            Alert.alert("Incorrect fill data", "Chose recipe photo")
            return
          }
          if(!recipe.name.length){
            Alert.alert("Incorrect fill data", "Enter price name")
            return
          }
          if(!recipe.ingredients.length){
            Alert.alert("Incorrect fill data", "Filling ingridients list")
            return
          }
          navigation.navigate('DirectionsRecipeScreen',recipe)
        }}>
          Next
        </LCButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {},
  wrapper: {
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
    flex: 1,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  imageContainer: {
    width: 160,
    height: 160,
    alignSelf: "center",
  },
  action: {
    marginTop: 40,
  },
});
