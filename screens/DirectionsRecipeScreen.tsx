import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import LCButton from "../components/LCButton";
import ListView from "../components/ListView";
import Recipe from "../models/Recipe";
import { Picker } from "@react-native-community/picker";
import REST from "../api";
import Loading from "../components/Loading";
import Category from "../models/Category";

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
      setCategories(payload);
      setLoad(false);
    });
  }, []);

  const createRecipe = async () => {
    console.log("Create Recipe");

    if (!recipe.category_id) {
      Alert.alert("Incorrect fill data", "Choose category");
      return;
    }
    if (!recipe.directions.length) {
      Alert.alert("Incorrect fill data", "Please, fill recipe directions");
      return;
    }
    const content = `<h2>Ingredients</h2>
      <ul>
      ${recipe.ingredients.map((it) => `<li>${it}</li>`)}
      </ul>
      <h2>Directions</h2>
      <ul>
        ${recipe.ingredients.map(
          (it, i) => `<li><strong>STEP ${i + 1}</strong>&nbsp;${it}</li>`
        )}
      </ul>`;
    try {
      await REST.createPosts(recipe.name, content, recipe.category_id);
      Alert.alert(
        "Alert",
        `You have successfully created a recipe.
      In the near future, our moderators will check the correctness of filling in your prescription data.`
      );
      navigation.pop(2);
    } catch (ex) {
      console.error(ex.response.data);
    }
  };
  if (load) return <Loading />;
  else
    return (
      <View style={styles.root}>
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
      </View>
    );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginLeft: 16,
    marginRight: 16,
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
