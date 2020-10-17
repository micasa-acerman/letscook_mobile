import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import LCButton from "../components/LCButton";
import ListView from "../components/ListView";
import Recipe from "../models/Recipe";
import { Picker } from "@react-native-community/picker";
import REST from "../api";
import Loading from "../components/Loading";
import Category from "../models/Category";
import { ScrollView } from "react-native-gesture-handler";

export default function DirectionsRecipeScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
const [recipe, setRecipe] = useState<Recipe>(route.params);
  const [load, setLoad] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  useEffect(() => {
    REST.getCategories().then((payload) => {
      setLoad(false);
      setCategories(payload);
    });
  }, []);

  const createRecipe = async () => {
    if (!recipe.category_id) {
      Alert.alert("Incorrect fill data", "Choose category");
      return;
    }
    if (!recipe.directions.length) {
      Alert.alert("Incorrect fill data", "Please, fill recipe directions");
      return;
    }
    setLoad(true);
    const content = `<h2>Ingredients</h2>
      <ul>
      ${recipe.ingredients.map((it) => `<li>${it.replace(/\r\n/g,'')}</li>`)}
      </ul>
      <h2>Directions</h2>
      <ul>
        ${recipe.ingredients.map(
          (it, i) => `<li><strong>STEP ${i + 1}</strong>&nbsp;${it.replace(/\r\n/g,'')}</li>`
        )}
      </ul>`;
    try {
      const media = await REST.sendMedia(recipe.image_uri)
      const post = await REST.createPosts(recipe.name, content, recipe.category_id,media.id);
      Alert.alert(
        "Notify",
        `You have successfully created a recipe. 
In the near future, our moderators will check the correctness of filling in your prescription data.`
      );
      navigation.pop(2);
    } catch (ex) {
      console.error(ex.response.data);
      setLoad(false)
    }
  };
  if (load) return <Loading />;
  else
    return (
      <ScrollView style={styles.root}>
        <ListView
          data={recipe.directions}
          label="Directions"
          onAdd={(item) => {
            if (!recipe.directions.includes(item))
              setRecipe({
                ...recipe,
                directions: [item, ...recipe.directions],
              });
          }}
          onRemove={(item) => {
            const filtered = recipe.directions.filter((it) => it != item);
            setRecipe({ ...recipe, directions: filtered });
          }}
        />
        <Text style={styles.action}>Category</Text>
        <Picker
          selectedValue={recipe.category_id}
          onValueChange={(itemValue, itemIndex) =>
            setRecipe({ ...recipe, category_id: itemValue })
          }
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>
        <LCButton containerStyle={styles.action} onClick={createRecipe}>
          Create
        </LCButton>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 20,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 20
  },
  action: {
    marginTop: 40,
  },
  label: {
    fontSize: 16,
    fontFamily: "aqua-medium",
    color: "#828282",
    marginBottom: 8,
  },
});
